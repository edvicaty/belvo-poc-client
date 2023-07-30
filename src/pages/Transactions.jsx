import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getTransactionsByInstitution,
  registerLink,
} from "../utils/belvoPocHttpHelper";
import { Alert, Button, Card, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormLinkComponent from "../components/FormLinkComponent";

const Transactions = () => {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState();
  const [accounts, setAccounts] = useState();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    bankUsername: "",
    bankPassword: "",
  });
  const searchParams = new URLSearchParams(location.search);
  const institution = searchParams.get("institution");

  useEffect(() => {
    setLoading(true);
    if (loaded) {
      return;
    }
    const fetchTransactions = async () => {
      const response = await getTransactionsByInstitution(institution);
      console.log(response);
      if (!response) {
        setShowModal(true);
        return null;
      }
      if (response?.transactions?.length > 0) {
        setLoading(false);
        setTransactions(response.transactions);
        setAccounts(response?.accounts);
        setLoaded(true);
        setShowModal(false);
        return true;
      }
    };

    fetchTransactions().catch(console.error);
  }, []);

  const onHide = () => {
    navigate(`/`, { replace: true });
    return;
  };

  const fetchTransactions = async () => {
    const response = await getTransactionsByInstitution();
    setLoaded(false);
    console.log(response);
    if (!response) {
      return null;
    }
    if (response?.transactions?.length > 0) {
      setLoading(false);
      setTransactions(response?.transactions);
      setAccounts(response?.accounts);
      setLoaded(true);
      setShowModal(false);
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await registerLink(
      institution,
      formValues.bankUsername,
      formValues.bankPassword
    );
    if (response) {
      await fetchTransactions();
      setShowModal(false);
      setLoading(false);
      return;
    }
    navigate(`/`, { replace: true });
    return;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  return (
    <div>
      <h1>Transactions {institution}</h1>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      )}
      {error && (
        <Alert>
          <Alert.Heading>{error}</Alert.Heading>
        </Alert>
      )}
      {institution && (
        <Modal show={showModal} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Choose {institution}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Enter your bank credentials to continue</Modal.Body>
          <div
            style={{ padding: "1rem", paddingBottom: 0, fontSize: "0.8rem" }}
          >
            <p>Mock data is available with:</p>
            <p>username: bnk102</p>
            <p>password: low</p>
          </div>
          <div style={{ padding: "1rem" }}>
            <FormLinkComponent
              values={formValues}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Return to home
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Create Link
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {transactions?.length > 0 &&
        transactions.map((transaction) => {
          return (
            <Card
              style={{
                padding: "1rem",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <p>
                <strong>{transaction.description}</strong>
              </p>
              <p>
                <strong>{transaction.amount}</strong>
              </p>
              <p>
                <strong>{transaction.currency}</strong>
              </p>
              <p>
                <strong>{transaction.account?.type}</strong>
              </p>
              <p>{transaction.category}</p>
              <p>{transaction.status}</p>
              <p>{transaction.type}</p>
            </Card>
          );
        })}
    </div>
  );
};

export default Transactions;
