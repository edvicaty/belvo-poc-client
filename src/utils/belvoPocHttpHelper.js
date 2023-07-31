import axios from "axios";
import { useAuth } from "../provider/authProvider";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function handleLogin(username, password) {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/authenticate`, {
      email: username,
      password,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function handleRegister(username, password) {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/register`, {
      email: username,
      password,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getInstitutions() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/belvo/institutions`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function registerLink(institution, bankUsername, bankPassword) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/belvo/link`,
      {
        institution,
        bankUsername,
        bankPassword,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getTransactionsByInstitution(institution) {
  try {
    const transactionResponse = await axios.post(
      `${BASE_URL}/api/v1/belvo/transactions`,
      {
        institution,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const accountsResponse = await getAccountsByInstitution(institution);
    if (transactionResponse.data && accountsResponse?.length > 0) {
      return {
        transactions: transactionResponse.data,
        accounts: accountsResponse,
      };
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getAccountsByInstitution(institution) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/belvo/accounts`,
      {
        institution,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

export {
  handleLogin,
  handleRegister,
  getInstitutions,
  registerLink,
  getTransactionsByInstitution,
  getAccountsByInstitution,
};
