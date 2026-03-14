import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from '../../../../../../server/lib/auth';
import { adminService } from '../../../../../../server/services/admin.service';

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
        const { amount, description } = body;

        if (amount === undefined || !description) {
            return NextResponse.json({ message: 'Amount and description are required' }, { status: 400 });
        }

        const result = await adminService.adjustPoints(id, amount, description);
        return NextResponse.json({ message: 'Points adjusted successfully', result });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: 400 }
        );
    }
}
