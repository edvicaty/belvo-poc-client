import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { handleRegister } from "../utils/belvoPocHttpHelper";
import { Alert, Spinner } from "react-bootstrap";
import FormComponent from "../components/FormComponent";

const Register = () => {
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

  const handleSubmit = async (event) => {
    setLoading(true);

    event.preventDefault();
    const response = await handleRegister(
      formValues.email,
      formValues.password
    );
    if (response?.username) {
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
      <h1>Register Page</h1>
      <FormComponent
        values={formValues}
        onChange={handleChange}
        onSubmit={handleSubmit}
        disabled={loading}
      />
      {error && (
        <Alert variant="danger">
          There was an error processing the registration process
        </Alert>
      )}
      {loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      )}
    </div>
  );
};

export default Register;
