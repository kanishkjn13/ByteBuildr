import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { UserProfile, UserRole, LoginCredentials, RegisterInput } from './types';

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'usr-admin-001',
    email: 'admin@bytebuild.dev',
    fullName: 'Alexander Vance',
    company: 'Byte Build Agency',
    phone: '+1 (415) 555-0199',
    role: 'Administrator',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    isEmailVerified: true,
    createdAt: '2025-01-01',
    lastLoginAt: 'Just now'
  },
  {
    id: 'usr-pm-002',
    email: 'pm@bytebuild.dev',
    fullName: 'Marcus Vance',
    company: 'Byte Build Agency',
    phone: '+1 (415) 555-0188',
    role: 'Project Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    isEmailVerified: true,
    createdAt: '2025-01-10',
    lastLoginAt: 'Just now'
  },
  {
    id: 'usr-dev-003',
    email: 'dev@bytebuild.dev',
    fullName: 'David Chen',
    company: 'Byte Build Agency',
    phone: '+1 (415) 555-0177',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    isEmailVerified: true,
    createdAt: '2025-02-01',
    lastLoginAt: 'Just now'
  },
  {
    id: 'usr-client-004',
    email: 'client@horizonresorts.com',
    fullName: 'Victoria Sterling',
    company: 'Horizon Luxury Resorts',
    phone: '+1 (415) 890-3420',
    role: 'Client',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    isEmailVerified: true,
    createdAt: '2025-03-15',
    lastLoginAt: 'Just now'
  }
];

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<UserProfile>;
  loginDemo: (role: UserRole) => Promise<UserProfile>;
  loginWithGoogle: () => Promise<UserProfile>;
  register: (input: RegisterInput) => Promise<UserProfile>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (email: string, otp: string, newPass: string) => Promise<boolean>;
  verifyEmail: (code: string) => Promise<boolean>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'bytebuild_auth_user_v1';
const TOKEN_STORAGE_KEY = 'bytebuild_auth_token_v1';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.role === 'Client') {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          sessionStorage.removeItem(AUTH_STORAGE_KEY);
          sessionStorage.removeItem(TOKEN_STORAGE_KEY);
          return null;
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_STORAGE_KEY) || sessionStorage.getItem(TOKEN_STORAGE_KEY) || null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const persistAuth = (userProfile: UserProfile, mockToken: string, rememberMe: boolean = true) => {
    setUser(userProfile);
    setToken(mockToken);
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userProfile));
    storage.setItem(TOKEN_STORAGE_KEY, mockToken);
  };

  const login = async (credentials: LoginCredentials): Promise<UserProfile> => {
    setIsLoading(true);
    setError(null);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setIsLoading(false);
        if (
          credentials.email.toLowerCase() === 'admin@bytebuild.security.intranet' &&
          credentials.password === 'Byte Build_Security_2026_KeyPass_Alpha!'
        ) {
          const adminUser = DEMO_USERS.find(u => u.role === 'Administrator') || DEMO_USERS[0];
          const updatedUser = { ...adminUser, lastLoginAt: 'Just now' };
          const mockJwt = `bytebuild_jwt_admin_${Date.now()}`;
          persistAuth(updatedUser, mockJwt, credentials.rememberMe);
          resolve(updatedUser);
        } else {
          reject(new Error('Invalid login credentials. Authorized credentials required.'));
        }
      }, 600);
    });
  };

  const loginDemo = async (_role: UserRole): Promise<UserProfile> => {
    setIsLoading(true);
    setError(null);
    return new Promise((_, reject) => {
      setTimeout(() => {
        setIsLoading(false);
        reject(new Error('Demo login is deactivated. Please use authorized credentials.'));
      }, 300);
    });
  };

  const loginWithGoogle = async (): Promise<UserProfile> => {
    setIsLoading(true);
    setError(null);
    return new Promise((_, reject) => {
      setTimeout(() => {
        setIsLoading(false);
        reject(new Error('SSO login is deactivated. Please use authorized credentials.'));
      }, 300);
    });
  };

  const register = async (input: RegisterInput): Promise<UserProfile> => {
    setIsLoading(true);
    setError(null);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        const newUser: UserProfile = {
          id: `usr-reg-${Date.now()}`,
          email: input.email,
          fullName: input.fullName,
          company: input.company || 'Enterprise Account',
          phone: input.phone,
          role: input.role || 'Client',
          isEmailVerified: false, // Requires verification flow
          createdAt: new Date().toISOString().split('T')[0],
          lastLoginAt: 'Just registered'
        };
        const mockJwt = `bytebuild_jwt_registered_${Date.now()}`;
        persistAuth(newUser, mockJwt, true);
        resolve(newUser);
      }, 700);
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  const forgotPassword = async (_email: string): Promise<boolean> => {
    return new Promise((resolve) => setTimeout(() => resolve(true), 500));
  };

  const resetPassword = async (_email: string, _otp: string, _newPass: string): Promise<boolean> => {
    return new Promise((resolve) => setTimeout(() => resolve(true), 500));
  };

  const verifyEmail = async (_code: string): Promise<boolean> => {
    if (user) {
      const verifiedUser = { ...user, isEmailVerified: true };
      setUser(verifiedUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(verifiedUser));
    }
    return true;
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user && !!token,
      isLoading,
      error,
      login,
      loginDemo,
      loginWithGoogle,
      register,
      logout,
      forgotPassword,
      resetPassword,
      verifyEmail,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
