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
        <div className='w-full rounded-md bg-red-50 h-full gap-4 flex items-center justify-center flex-col flex-1 mb-1 py-7 px-4'>
          <h2 className='text-red-500'>
            Oops, there was an error trying to display this component
          </h2>
          <pre className='text-red-500 text-sm break-words'>
            {this.state.error + ""}
          </pre>
          <div className="overflow-x-scroll w-full">
            <pre className='text-red-500 text-sm break-all w-fit'>
              {this.state.errorInfo?.componentStack + ""}
            </pre>
          </div>
          <button
            type='button'
            className='outline outline-1 bg-green-50 outline-red-300 text-red-500 rounded-md px-3 py-1'
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
