import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, User, LoginRequest, CreateUserRequest, AuthResponse } from '../api/auth';
import { getToken, removeToken } from '../api/config';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (data: LoginRequest) => Promise<void>;
  signUp: (data: CreateUserRequest) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: { name?: string; email?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await getToken();
        if (token) {
          const userData = await authApi.getMe();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        await removeToken();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = async (data: LoginRequest) => {
    const response: AuthResponse = await authApi.login(data);
    setUser({
      id: response.id,
      email: response.email,
      name: response.name,
    });
  };

  const signUp = async (data: CreateUserRequest) => {
    await authApi.register(data);
  };

  const signOut = async () => {
    await authApi.logout();
    setUser(null);
  };

  const updateUser = async (data: { name?: string; email?: string }) => {
    const updatedUser = await authApi.updateUser(data);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

