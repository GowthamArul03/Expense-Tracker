import { useState, useEffect } from "react";
import styled from "styled-components";
import OverviewComponent from "./OverviewComponent";
import TransactionsComponent from "./TransactionsComponent";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 360px;
  align-items: center;
`;

const HomeComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);

  // Add transaction
  const addTransaction = (payload) => {
    setTransactions([...transactions, payload]);
  };

  // Auto-calc balance
  useEffect(() => {
    let exp = 0;
    let inc = 0;

    transactions.forEach((t) => {
      if (t.type === "EXPENSE") exp += t.amount;
      else inc += t.amount;
    });

    setExpense(exp);
    setIncome(inc);
  }, [transactions]);

  return (
    <Container>
      <OverviewComponent
        expense={expense}
        income={income}
        addTransaction={addTransaction}
      />

      {/* Show transactions only if we have at least 1 */}
      {transactions.length > 0 && (
        <TransactionsComponent transactions={transactions} />
      )}
    </Container>
  );
};

export default HomeComponent;
