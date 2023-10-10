import { Component } from "react";
import { Link } from "react-router-dom";
class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary component caught an error", error, info);
  }

  handleClick = () => {
    this.props.history.push("/")
  }

  render() {
    if (this.state.hasError) {
      return (
        // this make a resuseable error boundary bcs any error
        // component that was passed to error boundary component will be displayed
        // this.props.errorComponent
        <div className="error-boundary" style={{textAlign: "center"}}>
        <img className="eb-image"src="https://media.istockphoto.com/id/1373841909/photo/dropped-strawberry-ice-cream-cone.jpg?s=612x612&w=0&k=20&c=0rvDtKEZSy7rijcQ-088zAa6eWNEhkMvQKFaeNSmyqU=" alt="Ice cream cone fallen"></img>
          <h1>
            <br></br>
            🍓 <br></br>Oops something went wrong... <br></br>
          </h1>
          <Link className="link" to="/" onClick={this.handleClick}>Back to home page.</Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;