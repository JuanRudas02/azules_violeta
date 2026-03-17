import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from '../../../server/lib/auth';
import { invoiceService } from '../../../server/services/invoice.service';

export async function POST(request: NextRequest) {
    const user = await getAuthUser(request);
    if (!user) return unauthorizedResponse();

    // Roles: CUSTOMER or ADMIN can submit
    if (user.role !== 'CUSTOMER' && user.role !== 'ADMIN') {
        return forbiddenResponse();
    }

    try {
        const formData = await request.formData();
        const file = formData.get('invoice') as File | null;
        const amountSpent = formData.get('amountSpent');

        if (!file || !amountSpent) {
            return NextResponse.json({ message: 'Missing file or amount' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const invoice = await invoiceService.submitInvoice(
            user.id,
            buffer,
            file.name,
            file.type,
            Number(amountSpent)
        );

        return NextResponse.json(invoice, { status: 201 });
    } catch (error: any) {
        console.error('Submission Error:', error);
        return NextResponse.json(
            { message: error.message || 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
