import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import apiTransaction from "../services/apiTransaction";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { user, setUser } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(null);
  const navigate = useNavigate();

  useEffect(home, [user.token]);

  function home() {
    apiTransaction
      .home(user.token)
      .then((res) => {
        console.log(res.data);
        setTransactions(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

  function transaction(type) {
    setUser({ ...user, type: type });
    navigate(`/nova-transacao/${type}`);
  }

  function logout() {
    apiTransaction
      .logout(user.token)
      .then(() => navigate("/"))
      .catch((err) => console.log(err.response.data.message));
  }

  useEffect(() => {
    const newTotal = transactions.reduce((total, t) => {
      if (t.tipo === "entrada") {
        return total + Number(t.valor);
      } else {
        return total - Number(t.valor);
      }
    }, 0);
    setTotal(newTotal);
  }, [transactions]);

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit onClick={() => logout()} />
      </Header>

      <TransactionsContainer>
        {total ? (
          <ul>
            {transactions.map((t) => (
              <ListItemContainer key={t._id}>
                <div>
                  <span>{t.data}</span>
                  <strong>{t.descricao}</strong>
                </div>
                <Value color={t.tipo === "saida" ? "negativo" : "positivo"}>
                  {Number(t.valor).toFixed(2).replace(".", ",")}
                </Value>
              </ListItemContainer>
            ))}
          </ul>
        ) : (
          <NoTransactions>Não há registros de entrada ou saída</NoTransactions>
        )}
        <article>
          <strong>Saldo</strong>
          <Value color={total < 0 ? "negativo" : "positivo"}>
            {Number(total).toFixed(2)}
          </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button onClick={() => transaction("entrada")}>
          <AiOutlinePlusCircle />
          <p>
            Nova <br /> entrada
          </p>
        </button>
        <button onClick={() => transaction("saida")}>
          <AiOutlineMinusCircle />
          <p>
            Nova <br />
            saída
          </p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const NoTransactions = styled.div`
  padding-top: 180px;
  padding-left: 40px;
  padding-right: 40px;
  text-align: center;
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
