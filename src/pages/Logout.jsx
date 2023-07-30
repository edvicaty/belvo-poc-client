import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { Button } from "react-bootstrap";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <h1>Logout Page</h1>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
