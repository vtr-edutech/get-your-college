import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.error({ error, errorInfo });
    this.setState({
        ...this.state,
        error, errorInfo
    })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="w-full rounded-md bg-red-50 h-full flex items-center justify-center flex-col">
          <h2 className="text-red-500">Oops, there was an error trying to display this component</h2>
          <p className="text-red-500 text-sm">{this.state.error + ''}</p>
          <p className="text-red-500 text-sm">{this.state.errorInfo + ''}</p>
          <button
            type='button'
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
