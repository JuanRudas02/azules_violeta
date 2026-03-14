import { NextResponse } from 'next/server';
import { authService } from '../../../../server/services/auth.service';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const result = await authService.login(email, password);

        if (!result) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: 'Login successful', ...result },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}
