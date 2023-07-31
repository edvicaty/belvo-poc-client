import React, { useEffect, useState } from "react";
import { getInstitutions, registerLink } from "../utils/belvoPocHttpHelper";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Institutions = () => {
  const [institutions, setInstitutions] = useState();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (loaded) {
      return;
    }
    const fetchData = async () => {
      const response = await getInstitutions(token);
      if (!response) {
        return;
      }
      if (response?.length > 0) {
        setInstitutions(response);
        setLoaded(true);
      }
    };
    fetchData().catch(console.error);
  }, []);

  const handleClick = (institution) => {
    navigate(`/transactions?institution=${institution.name}`, {
      replace: true,
    });
    return;
  };

  return (
    <div>
      <h1>Institutions</h1>
      <p>
        Choose the desired institution. Right now only test institutions are
        being shown.
      </p>
      {institutions?.length > 0 &&
        institutions.map((institution) => (
          <Card style={{ marginBottom: "2rem", padding: "10px" }}>
            <Card.Title>{institution?.displayName}</Card.Title>
            <Button
              onClick={() => {
                handleClick(institution);
              }}
              variant="secondary"
            >
              Choose institution
            </Button>
          </Card>
        ))}
    </div>
  );
};

export default Institutions;
