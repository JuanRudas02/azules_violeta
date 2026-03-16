import { prisma } from './src/shared/lib/prisma';

async function main() {
    try {
        const users = await prisma.user.findMany({
            select: {
                email: true,
                role: true,
                name: true
            }
        });
        console.log('USERS_RESULT:', JSON.stringify(users));
    } catch (err) {
        console.error('DB_ERROR:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
