import { prisma } from '../../shared/lib/prisma';

export class CmsService {
    async getHomeContent() {
        const configs = await prisma.systemConfig.findMany({
            where: {
                key: { in: ['HERO_TITLE', 'HERO_SUBTITLE', 'BENEFITS_SECTION'] },
            },
        });

        const response = configs.reduce((acc: Record<string, string>, current: any) => {
            acc[current.key] = current.value;
            return acc;
        }, {} as Record<string, string>);

        return response;
    }

    async updateHomeContent(data: Record<string, string>) {
        const updates = Object.entries(data).map(([key, value]) =>
            prisma.systemConfig.upsert({
                where: { key },
                update: { value },
                create: { key, value },
            })
        );
        return await prisma.$transaction(updates);
    }

    async getContentItems(type?: 'NEWS' | 'PROMOTION') {
        return await prisma.contentItem.findMany({
            where: {
                type,
                isActive: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async addContentItem(data: { type: 'NEWS' | 'PROMOTION', title: string, content: string, imageUrl?: string, metadata?: string }) {
        return await prisma.contentItem.create({
            data: {
                type: data.type as any,
                title: data.title,
                content: data.content,
                imageUrl: data.imageUrl,
                metadata: data.metadata || JSON.stringify({ likes: 0, views: 0 }),
            },
        });
    }

    async deleteContentItem(id: string) {
        return await prisma.contentItem.update({
            where: { id },
            data: { isActive: false },
        });
    }

    async updateReactions(id: string, metadata: string) {
        return await prisma.contentItem.update({
            where: { id },
            data: { metadata },
        });
    }
}

export const cmsService = new CmsService();
