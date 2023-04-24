import axios from "axios";

const BASE_URL = "http://localhost:5000";

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

function transaction(body, token) {
  const promise = axios.post(`${BASE_URL}/nova-transacao/:tipo`,
    body,
    createConfig(token)
  );
  return promise;
}

const apiAuth = { home, transaction };
export default apiAuth;
