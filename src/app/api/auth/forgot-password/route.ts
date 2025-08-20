import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: '이메일을 입력해주세요' },
        { status: 400 },
      );
    }

    // 백엔드 API 호출
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/api/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      },
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}
