import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { resetToken, newPassword } = await request.json();

    if (!resetToken || !newPassword) {
      return NextResponse.json(
        { success: false, message: '필수 정보가 누락되었습니다' },
        { status: 400 },
      );
    }

    // 백엔드 API 호출
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/api/auth/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetToken, newPassword }),
      },
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}
