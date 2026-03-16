import { NextRequest, NextResponse } from 'next/server';
import { cmsService } from '@/server/services/cms.service';
import { getAuthUser } from '@/server/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type') as 'NEWS' | 'PROMOTION' | null;

        const items = await cmsService.getContentItems(type || undefined);
        return NextResponse.json(items);
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error fetching content', error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const user = await getAuthUser(request);
    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const item = await cmsService.addContentItem(body);
        return NextResponse.json(item, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error creating content', error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    const user = await getAuthUser(request);
    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

        await cmsService.deleteContentItem(id);
        return NextResponse.json({ message: 'Deleted' });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error deleting content', error: error.message },
            { status: 500 }
        );
    }
}
