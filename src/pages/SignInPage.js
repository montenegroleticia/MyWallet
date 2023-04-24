import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import apiAuth from "../services/apiAuth";
import { useState } from "react";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventeDefault();

    apiAuth
      .login(form)
      .then((res) => {
        console.log(res.data);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  }

  return (
    <SingInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
        <input
          name="email"
          placeholder="E-mail"
          type="email"
          required
          value={form.email}
          onChange={handleForm}
        />
        <input
          name="senha"
          placeholder="Senha"
          type="password"
          required
          autoComplete="new-password"
          value={form.senha}
          onChange={handleForm}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to={`/cadastro`}>Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
