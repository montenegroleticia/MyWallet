import axios from "axios";

const BASE_URL = "https://mywallet-api-m71s.onrender.com";

function signIn(body) {
  const promise = axios.post(`${BASE_URL}/`, body);
  return promise;
}

function signUp(body) {
  const promise = axios.post(`${BASE_URL}/cadastro`, body);
  return promise;
}

const apiAuth = { signIn, signUp };
export default apiAuth;
