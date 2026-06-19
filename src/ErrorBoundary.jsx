import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // 1. Initialize state to track if an error occurred
    this.state = { hasError: false, errorMessage: '' };
  }

  // 2. This lifecycle method is called instantly when a child throws an error.
  // It allows us to update the state so the next render shows the fallback UI.
  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  // 3. This lifecycle method is used for logging the error to a service
  // like Sentry, Datadog, or New Relic.
  componentDidCatch(error, errorInfo) {
    console.error("Caught by Error Boundary:", error);
    console.error("Component Stack:", errorInfo.componentStack);
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    // 4. If an error happened, render the fallback UI
    if (this.state.hasError) {
      // You can render any custom fallback UI here, or use a prop passed down
      return this.props.fallback || (
        <div style={{ padding: '20px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px' }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.errorMessage}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }

    // 5. If everything is fine, just render the normal children
    return this.props.children;
  }
}

export default ErrorBoundary;