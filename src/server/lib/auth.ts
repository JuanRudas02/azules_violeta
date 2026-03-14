import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key';

export interface UserPayload {
    id: string;
    role: Role;
}

export async function getAuthUser(req: NextRequest): Promise<UserPayload | null> {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
        return decoded;
    } catch (error) {
        return null;
    }
}

export function unauthorizedResponse() {
    return NextResponse.json({ message: 'Unauthorized: No token provided or invalid token' }, { status: 401 });
}

export function forbiddenResponse() {
    return NextResponse.json({ message: 'Forbidden: Insufficient permissions' }, { status: 403 });
}
