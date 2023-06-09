import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import apiTransaction from "../services/apiTransaction";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function TransactionsPage() {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({ valor: "", descricao: "" });
  const [disabledTransaction, setDisabledTransaction] = useState(false);
  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleTransaction(e) {
    e.preventDefault(e);
    setDisabledTransaction(true);

    apiTransaction
      .transaction(user.type, form, user.token)
      .then((res) => {
        setDisabledTransaction(false);
        navigate(`/home`);
      })
      .catch((err) => {
        setDisabledTransaction(false);
        alert(err.response.data);
      });
  }

  return (
    <TransactionsContainer>
      <h1>Nova {user.type === "saida" ? "saída" : "entrada"}</h1>
      <form onSubmit={handleTransaction}>
        <input
          name="valor"
          placeholder="Valor"
          type="number"
          step="0.01"
          min="0"
          required
          disabled={disabledTransaction}
          value={form.valor}
          onChange={handleForm}
        />
        <input
          name="descricao"
          placeholder="Descrição"
          type="text"
          required
          disabled={disabledTransaction}
          value={form.descricao}
          onChange={handleForm}
        />
        <button disabled={disabledTransaction} type="submit">
          {disabledTransaction ? (
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
            `Salvar ${user.type === "saida" ? "saída" : "entrada"}`
          )}
        </button>
        <button disabled={disabledTransaction} type="button" onClick={()=> navigate("/home")}>
          {disabledTransaction ? (
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
            `Cancelar`
          )}
        </button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
