export interface User {
  _id: string;
  username: string;
  email: string;
  nickname: string;
  profileImage: string;
  preferences: string[];
  recentSearches: string[];
  isActive: boolean;
  lastLoginAt: Date;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  nickname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface EmailVerificationRequest {
  email: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user?: User;
    token?: string;
  };
  errors?: Record<string, string>;
}

export interface EmailVerificationResponse {
  success: boolean;
  message: string;
  data?: {
    verified?: boolean;
  };
  errors?: Record<string, string>;
}
