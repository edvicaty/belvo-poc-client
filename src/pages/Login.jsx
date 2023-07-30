import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Login = () => {
  const { setToken, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
      return;
    }
  }, []);

  const handleLogin = () => {
    setToken("this is a test token");
    navigate("/", { replace: true });
  };

  return (
    <div>
      Login Page <button onClick={handleLogin}>login</button>
    </div>
  );
};

export default Login;
