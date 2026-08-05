import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled Error Boundary exception:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6 text-center">
          <div className="neo-card p-10 max-w-lg border border-[var(--border-light)] rounded-[24px] space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center neo-card mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Something Went Wrong</h1>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              An unexpected runtime error occurred. Our technical monitoring team has been notified automatically.
            </p>

            {this.state.error && (
              <div className="neo-inset p-3 rounded-xl text-[10px] font-mono text-rose-500 text-left overflow-x-auto max-h-32">
                {this.state.error.message}
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="neo-btn neo-btn-accent text-xs py-3 px-6 justify-center"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Application</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="neo-btn text-xs py-3 px-6 justify-center text-[var(--text-primary)]"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
