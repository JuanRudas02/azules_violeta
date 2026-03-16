import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from '../../../../server/lib/auth';
import { prisma } from '../../../../shared/lib/prisma';

export async function GET(request: NextRequest) {
    const user = await getAuthUser(request);
    if (!user) return unauthorizedResponse();
    if (user.role !== 'ADMIN') return forbiddenResponse();

    try {
        const configs = await prisma.systemConfig.findMany();
        return NextResponse.json(configs);
    } catch (error: any) {
        return NextResponse.json({ message: 'Error fetching config', error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const user = await getAuthUser(request);
    if (!user) return unauthorizedResponse();
    if (user.role !== 'ADMIN') return forbiddenResponse();

    try {
        const body = await request.json();
        const { key, value } = body;

        if (!key) {
            return NextResponse.json({ message: 'Key is required' }, { status: 400 });
        }

        const config = await prisma.systemConfig.upsert({
            where: { key },
            update: { value: String(value) },
            create: { key, value: String(value) }
        });

        return NextResponse.json(config);
    } catch (error: any) {
        return NextResponse.json({ message: 'Error saving config', error: error.message }, { status: 500 });
    }
}
