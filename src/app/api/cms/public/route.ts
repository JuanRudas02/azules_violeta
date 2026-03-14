import { NextResponse } from 'next/server';
import { cmsService } from '../../../../server/services/cms.service';

export async function GET() {
    try {
        const content = await cmsService.getHomeContent();
        return NextResponse.json(content);
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}
