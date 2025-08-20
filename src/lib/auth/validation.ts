import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(1).max(20),
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  password: z.string().min(6).max(100),
  nickname: z.string().min(2).max(20),
});

export const loginSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  password: z.string().min(6),
});

export const emailVerificationSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
});

export const verifyEmailSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  code: z.string().length(6),
});
