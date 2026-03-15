import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from '../../../../server/lib/auth';
import { adminService } from '../../../../server/services/admin.service';
import { prisma } from '../../../../shared/lib/prisma';

export async function GET(request: NextRequest) {
    const user = await getAuthUser(request);
    if (!user) return unauthorizedResponse();
    if (user.role !== 'ADMIN') return forbiddenResponse();

    try {
        const [userCount, pendingInvoices, totalPoints, totalTransactions] = await Promise.all([
            prisma.user.count({ where: { role: 'CUSTOMER' } }),
            prisma.invoice.count({ where: { status: 'PENDING' } }),
            prisma.wallet.aggregate({ _sum: { lifetimePoints: true } }),
            prisma.transaction.count()
        ]);

        return NextResponse.json({
            userCount,
            pendingInvoices,
            totalPoints: totalPoints._sum.lifetimePoints || 0,
            totalTransactions
        });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}
