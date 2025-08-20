import { NextRequest, NextResponse } from 'next/server';
import { emailVerificationSchema } from '@/lib/auth/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = emailVerificationSchema.parse(body);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/api/auth/send-verification`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      },
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json(
        { success: false, message: '유효성 검사 실패', errors: error.errors },
        { status: 400 },
      );
    }

    console.error('Send verification error:', error);
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}
