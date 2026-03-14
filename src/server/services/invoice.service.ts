import { prisma } from '../../shared/lib/prisma';
import { supabase } from '../../shared/lib/supabase';

export class InvoiceService {
    async submitInvoice(userId: string, fileBuffer: Buffer, fileName: string, contentType: string, amountSpent: number) {
        const fileExt = fileName.split('.').pop();
        const storageFileName = `${userId}_${Date.now()}.${fileExt}`;

        const { data, error } = await supabase.storage
            .from('invoices')
            .upload(storageFileName, fileBuffer, {
                contentType,
            });

        if (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        }

        const { data: publicUrlData } = supabase.storage
            .from('invoices')
            .getPublicUrl(storageFileName);

        return await prisma.invoice.create({
            data: {
                userId,
                imageUrl: publicUrlData.publicUrl,
                amountSpent,
                status: 'PENDING',
            },
        });
    }

    async getPendingInvoices(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const [total, invoices] = await Promise.all([
            prisma.invoice.count({ where: { status: 'PENDING' } }),
            prisma.invoice.findMany({
                where: { status: 'PENDING' },
                skip,
                take: limit,
                include: {
                    user: { select: { name: true, email: true } },
                },
                orderBy: { createdAt: 'asc' },
            }),
        ]);

        return { total, page, limit, invoices };
    }

    async approveInvoice(invoiceId: string, adminId: string) {
        const invoice = await prisma.invoice.findUnique({
            where: { id: invoiceId },
            include: { user: { include: { wallet: true } } },
        });

        if (!invoice) throw new Error('Invoice not found');
        if (invoice.status !== 'PENDING') throw new Error('Only PENDING invoices can be approved');
        if (!invoice.user.wallet) throw new Error('User wallet not found');

        let pointsPerPurchaseConfig = await prisma.systemConfig.findUnique({
            where: { key: 'POINTS_PER_PURCHASE_DIVISOR' },
        });

        const divisor = pointsPerPurchaseConfig ? parseInt(pointsPerPurchaseConfig.value) : 1000;
        const amountVal = Number(invoice.amountSpent);
        const pointsAwarded = Math.floor(amountVal / divisor);

        return await prisma.$transaction([
            prisma.invoice.update({
                where: { id: invoiceId },
                data: {
                    status: 'APPROVED',
                    reviewedBy: adminId,
                    pointsAwarded,
                },
            }),
            prisma.transaction.create({
                data: {
                    walletId: invoice.user.wallet.id,
                    amount: pointsAwarded,
                    type: 'INVOICE_APPROVED',
                    description: `Puntos otorgados por compra de ${amountVal}`,
                },
            }),
            prisma.wallet.update({
                where: { id: invoice.user.wallet.id },
                data: {
                    balance: { increment: pointsAwarded },
                    lifetimePoints: { increment: pointsAwarded },
                },
            }),
        ]);
    }

    async rejectInvoice(invoiceId: string, adminId: string, rejectionReason: string) {
        const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });

        if (!invoice) throw new Error('Invoice not found');
        if (invoice.status !== 'PENDING') throw new Error('Only PENDING invoices can be rejected');

        return await prisma.invoice.update({
            where: { id: invoiceId },
            data: {
                status: 'REJECTED',
                reviewedBy: adminId,
                rejectionReason,
            },
        });
    }
}

export const invoiceService = new InvoiceService();
