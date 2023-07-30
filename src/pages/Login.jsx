import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { handleLogin } from "../utils/belvoPocHttpHelper";
import { Alert, Spinner } from "react-bootstrap";
import FormComponent from "../components/FormComponent";

const Login = () => {
  const { setToken, token, setUser } = useAuth();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
      return;
    }
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    setLoading(true);

    event.preventDefault();
    // You can use the 'formValues' state here or perform any other actions
    console.log("Form submitted with values:", formValues);
    const response = handleLogin(formValues);
    if (response.ok) {
      setToken(response.token);
      setUser(response.username);
      navigate("/", { replace: true });
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(true);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <FormComponent
        values={formValues}
        onChange={handleChange}
        onSubmit={handleSubmit}
        disabled={loading}
      />
      {error && (
        <Alert variant="danger">
          There was an error processing the login process
        </Alert>
      )}
      {loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};

export default Login;
