import { SignJWT, jwtVerify } from 'jose';
import { User } from '@/types/auth';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || '7472ac6d9af1eee99765ef9cbe66957e4f6b21038d7f63f28eb11af3d945d065',
);

export async function signToken(payload: { userId: string; email: string }) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  return token;
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; email: string };
  } catch (error) {
    return null;
  }
}
