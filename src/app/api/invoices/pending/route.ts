import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from '../../../../server/lib/auth';
import { invoiceService } from '../../../../server/services/invoice.service';

export async function GET(request: NextRequest) {
    const user = await getAuthUser(request);
    if (!user) return unauthorizedResponse();
    if (user.role !== 'ADMIN') return forbiddenResponse();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    try {
        const result = await invoiceService.getPendingInvoices(page, limit);
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}
