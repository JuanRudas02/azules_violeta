import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, unauthorizedResponse } from '../../../../server/lib/auth';
import { userService } from '../../../../server/services/user.service';

export async function GET(request: NextRequest) {
    const user = await getAuthUser(request);
    if (!user) return unauthorizedResponse();

    try {
        const transactions = await userService.getUserTransactions(user.id);
        return NextResponse.json(transactions);
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}
