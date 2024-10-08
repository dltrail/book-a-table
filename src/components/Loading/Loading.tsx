import { Spinner } from "react-bootstrap";

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
 <>
    <Spinner animation="border" role="status">
      <span className="sr-only">{message}</span>
    </Spinner>
    <p>{message}</p>
    </>
  );

export default LoadingSpinner;