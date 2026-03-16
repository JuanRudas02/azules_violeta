import { NextRequest, NextResponse } from 'next/server';
import { cmsService } from '@/server/services/cms.service';
import { prisma } from '@/shared/lib/prisma';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const body = await request.json();
        const { action } = body; // 'like' or 'view'

        const item = await prisma.contentItem.findUnique({ where: { id } });
        if (!item) return NextResponse.json({ message: 'Not found' }, { status: 404 });

        let metadata = JSON.parse(item.metadata || '{"likes": 0, "views": 0}');

        if (action === 'like') metadata.likes += 1;
        if (action === 'view') metadata.views += 1;

        const updated = await cmsService.updateReactions(id, JSON.stringify(metadata));
        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error updating reactions', error: error.message },
            { status: 500 }
        );
    }
}
