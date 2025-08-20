import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/auth/validation';
import { signToken } from '@/lib/auth/jwt';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = loginSchema.parse(body);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      },
    );

    const data = await response.json();

    if (response.ok && data.success && data.data?.user) {
      const token = await signToken({
        userId: data.data.user._id,
        email: data.data.user.email,
      });

      cookies().set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return NextResponse.json(
        {
          ...data,
          data: {
            ...data.data,
            token,
          },
        },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json(
        { success: false, message: '유효성 검사 실패', errors: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}
