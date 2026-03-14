import { NextResponse } from 'next/server';
import { authService } from '../../../../server/services/auth.service';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, name, whatsapp, phone } = body;

        const user = await authService.register({
            email,
            password,
            name,
            whatsapp: whatsapp || phone
        });

        return NextResponse.json(
            { message: 'User registered successfully', user },
            { status: 201 }
        );
    } catch (error: any) {
        if (error.message === 'Email already in use') {
            return NextResponse.json({ message: error.message }, { status: 409 });
        }
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}
