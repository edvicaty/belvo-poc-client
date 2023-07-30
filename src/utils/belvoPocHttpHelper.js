import axios from "axios";

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
  }}

export { handleLogin, handleRegister };
