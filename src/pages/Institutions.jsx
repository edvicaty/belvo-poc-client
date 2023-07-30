import React, { useEffect, useState } from "react";
import { getInstitutions, registerLink } from "../utils/belvoPocHttpHelper";
import { Button, Card } from "react-bootstrap";

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      return;
    }
    const fetchData = async () => {
      const response = await getInstitutions();
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

  const handleClick = async () => {
    const response = await getInstitutions();
    console.log(response);
    if (!response) {
      return;
    }
  };

  return (
    <div>
      <h1>Institutions</h1>
      <p>
        Choose the desired institution. Right now only test institutions are
        being shown.
      </p>
      {institutions.length > 0 &&
        institutions?.map((institution) => (
          <Card style={{ marginBottom: "2rem", padding: "10px" }}>
            <Card.Title>{institution.displayName}</Card.Title>
            <Button variant="secondary">Choose institution</Button>
          </Card>
        ))}
    </div>
  );
};

export default Institutions;
