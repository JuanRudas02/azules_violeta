import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from '../../../../../server/lib/auth';
import { invoiceService } from '../../../../../server/services/invoice.service';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const user = await getAuthUser(request);
    if (!user) return unauthorizedResponse();
    if (user.role !== 'ADMIN') return forbiddenResponse();

    const { id } = await params;

    try {
        const result = await invoiceService.approveInvoice(id, user.id);
        return NextResponse.json({ message: 'Invoice approved successfully', result });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: 400 }
        );
    }
}
