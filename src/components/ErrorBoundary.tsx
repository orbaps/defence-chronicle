import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex items-center justify-center p-4 text-center">
          <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive font-medium mb-2">Something went wrong</p>
            <p className="text-sm text-muted-foreground">Failed to load this component.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
