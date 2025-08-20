import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const token = cookies().get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다' }, { status: 401 });
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 토큰입니다' },
        { status: 401 },
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/profile`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}
