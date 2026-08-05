import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ROUTES } from '../constants/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Clients can NEVER access admin routes
  if (user.role === 'Client') {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <>{children}</>;
};

export const ProtectedClientRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
