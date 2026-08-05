// 1. React & Routing Libraries
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// 2. Constants & Layout Shells
import { ROUTES } from '../constants/routes';
import { MainLayout } from '../layouts/MainLayout';

// 3. Common UI Elements
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';

// 4. Security Guards
import { ProtectedAdminRoute, ProtectedClientRoute } from '../auth/ProtectedRoutes';

// Lazy-loaded page components for Enterprise Code Splitting
const HomePage = lazy(() => import('../pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('../pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('../pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const PortfolioPage = lazy(() => import('../pages/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const ContactPage = lazy(() => import('../pages/ContactPage').then(m => ({ default: m.ContactPage })));
const ClientPortalPage = lazy(() => import('../portal/ClientPortalPage').then(m => ({ default: m.ClientPortalPage })));
const AdminDashboardPage = lazy(() => import('../admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));

// Enterprise Authentication Pages
const LoginPage = lazy(() => import('../pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));
const VerifyEmailPage = lazy(() => import('../pages/auth/VerifyEmailPage').then(m => ({ default: m.VerifyEmailPage })));
const UnauthorizedPage = lazy(() => import('../pages/auth/UnauthorizedPage').then(m => ({ default: m.UnauthorizedPage })));

const AdaptiveFallback: React.FC = () => {
  return <LoadingSkeleton />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<AdaptiveFallback />}>
      <Routes>
        {/* Enterprise Authentication Routes */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />
        <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />

        {/* Admin Dashboard (Protected RBAC Route for Staff/Admins Only) */}
        <Route path={ROUTES.ADMIN + '/*'} element={
          <ProtectedAdminRoute>
            <AdminDashboardPage />
          </ProtectedAdminRoute>
        } />
        <Route path={ROUTES.ADMIN} element={
          <ProtectedAdminRoute>
            <AdminDashboardPage />
          </ProtectedAdminRoute>
        } />

        {/* Client Portal (Protected Route for Authenticated Clients) */}
        <Route path={ROUTES.PORTAL + '/*'} element={
          <ProtectedClientRoute>
            <ClientPortalPage />
          </ProtectedClientRoute>
        } />
        <Route path={ROUTES.PORTAL} element={
          <ProtectedClientRoute>
            <ClientPortalPage />
          </ProtectedClientRoute>
        } />

        {/* Main Agency Website (Public & Unrestricted) */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
