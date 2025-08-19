export interface UserType {
  id: string;
  username: string;
  email: string;
  nickname: string;
  password: string;
  profileImageUrl?: string;
  preference?: string[];
  recentSearches?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserResponse {
  success: boolean;
  data: {
    user: UserType;
  };
}

export interface User {
  username: string;
  email: string;
  nickname: string;
}
