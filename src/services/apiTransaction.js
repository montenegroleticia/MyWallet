import axios from "axios";

const BASE_URL = "https://mywallet-api-m71s.onrender.com";

function createConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

function home(token) {
  const promise = axios.get(`${BASE_URL}/home`, createConfig(token));
  return promise;
}

function transaction(type, body, token) {
  const promise = axios.post(
    `${BASE_URL}/nova-transacao/${type}`,
    body,
    createConfig(token)
  );
  return promise;
}

function logout(token) {
  const promise = axios.delete(`${BASE_URL}/logout`, createConfig(token));
  return promise;
}

const apiAuth = { home, transaction, logout};
export default apiAuth;
