import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getTransactionsByInstitution,
  registerLink,
} from "../utils/belvoPocHttpHelper";
import {
  Alert,
  Button,
  Card,
  CardGroup,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormLinkComponent from "../components/FormLinkComponent";

const Transactions = () => {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState();
  const [accounts, setAccounts] = useState();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    bankUsername: "",
    bankPassword: "",
  });
  const [visibleItems, setVisibleItems] = useState(10);
  const searchParams = new URLSearchParams(location.search);
  const institution = searchParams.get("institution");

  useEffect(() => {
    setLoading(true);
    if (loaded) {
      return;
    }
    const fetchTransactions = async () => {
      const response = await getTransactionsByInstitution(institution);
      console.log("onLoad");
      console.log(response);
      if (!response?.transactions?.length > 0) {
        setShowModal(true);
        return null;
      }
      setLoading(false);
      setTransactions(response.transactions);
      setAccounts(response?.accounts);
      setLoaded(true);
      setShowModal(false);
      return true;
    };

    fetchTransactions().catch(console.error);
  }, []);

  const onHide = () => {
    navigate(`/`, { replace: true });
    return;
  };

  const fetchTransactionsWhenLoaded = async () => {
    const response = await getTransactionsByInstitution(institution);
    console.log("onSubmit");
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
    setFormLoading(true);
    event.preventDefault();
    await fetchTransactionsWhenLoaded();
    const response = await registerLink(
      institution,
      formValues.bankUsername,
      formValues.bankPassword
    );
    if (response) {
      await fetchTransactionsWhenLoaded();
      setShowModal(false);
      setFormLoading(false);
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

  const loadMoreItems = async () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
  };

  const parseDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h1>Transactions {institution}</h1>
      {accounts?.length > 0 && (
        <div style={{ paddingTop: "1rem", paddingBottom: "2rem" }}>
          <h2>Accounts Balance</h2>
          <CardGroup>
            {accounts.map((account) => {
              return (
                <Card style={{ padding: "1rem" }}>
                  <Card.Title style={{ fontSize: "1rem", color: "blue" }}>
                    {account.category}
                  </Card.Title>
                  <Card.Text>
                    <p>currency: {account.currency}</p>
                    <p>institution: {account.institution?.name}</p>
                    <p>
                      current balance: <br />
                      <strong>
                        {account.balance?.current} {account.currency}
                      </strong>
                    </p>
                    <p>
                      available balance: <br />
                      <strong>
                        {account.balance?.available} {account.currency}
                      </strong>
                    </p>
                  </Card.Text>
                </Card>
              );
            })}
          </CardGroup>
        </div>
      )}

      {loading && !transactions?.length > 0 && (
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
            <Modal.Title>{institution}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Enter your bank credentials to continue</Modal.Body>
          <div
            style={{ padding: "1rem", paddingBottom: 0, fontSize: "0.8rem" }}
          >
            <p>Mock data is available with:</p>
            <strong>LOW ACTIVITY</strong>
            <p style={{marginBottom: "5px"}}>username: bnk102</p>
            <p style={{marginBottom: "5px"}}>password: low</p>
            <hr />
            <strong>HIGH ACTIVITY</strong>
            <p style={{marginBottom: "5px"}}>username: bnk100</p>
            <p style={{marginBottom: "5px"}}>password: full</p>
          </div>
          <div style={{ padding: "1rem" }}>
            <FormLinkComponent
              values={formValues}
              onChange={handleChange}
              onSubmit={handleSubmit}
              disabled={formLoading}
            />
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Return to home
            </Button>
            <Button
              variant="primary"
              disabled={formLoading}
              onClick={handleSubmit}
            >
              {formLoading ? "Loading" : "Create Link"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {transactions?.length > 0 ? (
        <>
          <h2>Transactions</h2>
          {transactions.slice(0, visibleItems).map((transaction) => {
            return (
              <Card
                style={{
                  padding: "1rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <p>
                  <strong style={{ color: "blue" }}>
                    Description: {transaction.description}
                  </strong>
                </p>
                <p>
                  <strong>
                    Amount: {transaction.amount} {transaction.currency}
                  </strong>
                </p>
                <p>
                  <strong>Account Type: {transaction.account?.type}</strong>
                </p>
                <p>Category: {transaction.category}</p>
                <p>Status: {transaction.status}</p>
                <p>Type: {transaction.type}</p>
                <p>Date: {parseDate(transaction.created_at)}</p>
              </Card>
            );
          })}
        </>
      ) : (
        !loading && <div>No transactions found</div>
      )}
      {visibleItems < transactions?.length && (
        <Button variant="success" onClick={loadMoreItems}>
          Load more
        </Button>
      )}
    </div>
  );
};

export default Transactions;
