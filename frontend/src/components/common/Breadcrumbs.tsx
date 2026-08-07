import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <div className="flex justify-center w-full">
      <nav aria-label="Breadcrumb" className="hidden md:inline-flex py-2 px-5 bg-[var(--surface-card)] border border-[var(--border-subtle)] items-center gap-2.5 rounded-full text-xs text-[var(--text-secondary)] shadow-sm mb-6">
        <Link to={ROUTES.HOME} className="hover:text-[var(--accent-primary)] flex items-center gap-1.5 transition-colors duration-200">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <React.Fragment key={name}>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
              {isLast ? (
                <span className="font-extrabold text-[var(--text-primary)]" aria-current="page">
                  {formattedName}
                </span>
              ) : (
                <Link to={routeTo} className="hover:text-[var(--accent-primary)] transition-colors">
                  {formattedName}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};
