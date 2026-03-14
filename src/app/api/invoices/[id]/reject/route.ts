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
        const body = await request.json();
        const { rejectionReason } = body;

        if (!rejectionReason) {
            return NextResponse.json({ message: 'Rejection reason is required' }, { status: 400 });
        }

        const result = await invoiceService.rejectInvoice(id, user.id, rejectionReason);
        return NextResponse.json({ message: 'Invoice rejected successfully', result });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: 400 }
        );
    }
}
