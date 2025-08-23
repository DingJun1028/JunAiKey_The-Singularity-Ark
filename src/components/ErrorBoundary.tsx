import React, { Component, ErrorInfo, ReactNode } from 'react';
import Card from './ui/Card';
import TrilingualText from './ui/TrilingualText';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: undefined };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  
  private handleRecover = () => {
    this.setState({ hasError: false, error: undefined });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="text-center max-w-lg">
                <h1 className="text-2xl font-bold text-error font-heading mb-4">An Unexpected Error Occurred</h1>
                <p className="text-foreground/80 mb-4">An error has occurred within JunAiKey. Our team has been notified.</p>
                <details className="text-left bg-background p-2 rounded text-xs text-foreground/60">
                    <summary>Error Details</summary>
                    <pre className="mt-2 whitespace-pre-wrap">
                        {this.state.error?.toString()}
                    </pre>
                </details>
                 <button onClick={this.handleRecover} className="mt-6 px-4 py-2 bg-secondary text-white rounded hover:bg-opacity-80">
                    Attempt to Recover
                </button>
            </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;