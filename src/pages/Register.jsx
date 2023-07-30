import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { Button } from "react-bootstrap";

const Login = () => {
  const { setToken, token, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
      return;
    }
  }, []);

  const handleLogin = () => {
    setToken("this is a test token");
    setUser("TestUser@user.com");
    navigate("/", { replace: true });
  };

  return (
    <div>
      <h1>Register Page</h1>
      <Button onClick={handleLogin}>Register</Button>
    </div>
  );
};

export default Login;
