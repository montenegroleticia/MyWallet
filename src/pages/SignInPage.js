import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import apiAuth from "../services/apiAuth";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const { setUser } = useContext(UserContext);
  const [disabledLogin, setDisabledLogin] = useState(false);
  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();
    setDisabledLogin(true);

    apiAuth
      .signIn({ ...form })
      .then((res) => {
        setDisabledLogin(false);
        setUser(res.data);
        navigate("/home");
      })
      .catch((err) => {
        setDisabledLogin(false);
        alert(err.response.data);
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
          disabled={disabledLogin}
          value={form.email}
          onChange={handleForm}
        />
        <input
          name="senha"
          placeholder="Senha"
          type="password"
          required
          autoComplete="new-password"
          disabled={disabledLogin}
          value={form.senha}
          onChange={handleForm}
        />
        <button disabled={disabledLogin} type="submit">
          {disabledLogin ? (
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
            "Entrar"
          )}
        </button>
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
  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
