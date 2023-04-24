import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import apiAuth from "../services/apiAuth";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function SignUpPage() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [disabledRegister, setDisabledRegister] = useState(false);
  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRegister(e) {
    e.preventDefault();
    setDisabledRegister(true);

    apiAuth
      .signUp(form)
      .then((res) => {
        setDisabledRegister(false);
        navigate("/");
      })
      .catch((err) => {
        setDisabledRegister(false);
        alert(err.response.data.message);
      });
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleRegister}>
        <MyWalletLogo />
        <input
          name="nome"
          placeholder="Nome"
          type="text"
          disabled={disabledRegister}
          value={form.name}
          onChange={handleForm}
        />
        <input
          name="email"
          placeholder="E-mail"
          type="email"
          required
          disabled={disabledRegister}
          value={form.email}
          onChange={handleForm}
        />
        <input
          name="senha"
          placeholder="Senha"
          type="password"
          required
          autoComplete="new-password"
          disabled={disabledRegister}
          value={form.senha}
          onChange={handleForm}
        />
        <input
          name="senha"
          placeholder="Confirme a senha"
          type="password"
          required
          autoComplete="new-password"
          disabled={disabledRegister}
          value={form.senha}
          onChange={handleForm}
        />
        <button type="submit" disabled={disabledRegister}>
          {disabledRegister ? (
            <ThreeDots
              height="40"
              width="40"
              radius="9"
              color="#FFFFFF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>

      <Link to={`/`}>Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
