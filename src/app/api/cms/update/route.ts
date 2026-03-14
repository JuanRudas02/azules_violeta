import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from '../../../../server/lib/auth';
import { cmsService } from '../../../../server/services/cms.service';

export async function POST(request: NextRequest) {
    const user = await getAuthUser(request);
    if (!user) return unauthorizedResponse();
    if (user.role !== 'ADMIN') return forbiddenResponse();

    try {
        const body = await request.json();
        const content = await cmsService.updateHomeContent(body);
        return NextResponse.json(content);
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}
