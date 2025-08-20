import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    cookies().delete('auth-token');

    return NextResponse.json({ success: true, message: '로그아웃되었습니다' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}
