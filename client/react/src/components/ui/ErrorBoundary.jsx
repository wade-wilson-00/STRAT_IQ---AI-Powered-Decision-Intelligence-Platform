import { Component } from "react";
import { AlertTriangle } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-rose-500/40 bg-rose-500/5 p-8">
          <AlertTriangle className="h-12 w-12 text-rose-400" />
          <h3 className="mt-4 text-lg font-semibold text-slate-100">
            Something went wrong
          </h3>
          <p className="mt-2 max-w-md text-center text-sm text-slate-400">
            {this.state.error?.message || "An unexpected error occurred. Please refresh the page."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-6 rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
