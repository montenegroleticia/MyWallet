import axios from "axios";

const REACT_APP_API_URL = "https://mywallet-api-m71s.onrender.com";


function createConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

function home(token) {
  const promise = axios.get(`${REACT_APP_API_URL}/home`, createConfig(token));
  return promise;
}

function transaction(type, body, token) {
  const promise = axios.post(
    `${REACT_APP_API_URL}/nova-transacao/${type}`,
    body,
    createConfig(token)
  );
  return promise;
}

function logout(token) {
  const promise = axios.delete(
    `${REACT_APP_API_URL}/logout`,
    createConfig(token)
  );
  return promise;
}

function deleteTransaction(token, id) {
  const promise = axios.delete(
    `${REACT_APP_API_URL}/${id}`,
    createConfig(token)
  );
  return promise;
}

const apiAuth = { home, transaction, logout, deleteTransaction };
export default apiAuth;
