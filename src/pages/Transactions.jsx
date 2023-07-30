import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { registerLink } from "../utils/belvoPocHttpHelper";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const [showModal, setShowModal] = useState(false);
  const [institution, setInstitution] = useState();
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const institution = searchParams.get("institution");
    if (!institution) {
      navigate(`/`, { replace: true });
      return;
    }
    setInstitution(institution);
    // TODO: Get transactions, if failed, Create Link, If create Link fails, redirect
    // if (loaded) {
    //   return;
    // }
    // const fetchData = async () => {
    //   const response = await getInstitutions();
    //   if (!response) {
    //     return;
    //   }
    //   if (response?.length > 0) {
    //     setInstitutions(response);
    //     setLoaded(true);
    //   }
    // };
    // fetchData().catch(console.error);
  }, []);

  const handleSubmit = async () => {
    // const response = await getInstitutions();
    // console.log(response);
    // if (!response) {
    //   return;
    // }
  };
  return (
    <div>
      <h1>Transactions</h1>
      {institution && (
        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Choose {institution.displayName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Enter your bank credentials to continue</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Create Link
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Transactions;
