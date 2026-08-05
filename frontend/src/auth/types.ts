export type UserRole = 
  | 'Administrator'
  | 'Agency Staff'
  | 'Project Manager'
  | 'Developer'
  | 'Designer'
  | 'Content Manager'
  | 'Support'
  | 'Client';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  company?: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterInput {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword?: string;
  role?: UserRole;
  acceptTerms: boolean;
}
