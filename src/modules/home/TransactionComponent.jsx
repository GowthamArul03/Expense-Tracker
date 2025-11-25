import { useEffect, useState } from "react";
import styled from "styled-components";

const TransactionsComponent = ({ transactions }) => {
    if (!transactions.length) {
    return (
      <Container>
        <Title>Transactions</Title>
        <p style={{ color: "#555", marginTop: "10px" }}>
          No transactions added yet
        </p>
      </Container>
    );
  }
  if (!transactions.length == 2) {
    return (
      <Container>
        <Title>Transactions</Title>
        <p style={{ color: "#555", marginTop: "10px" }}>
          No transactions added yet
        </p>
      </Container>
    );
  }

  const [searchText, setSearchText] = useState("");
  const [sortedList, setSortedList] = useState(transactions);

  useEffect(() => {
    setSortedList(transactions);
  }, [transactions]);

  const sortHighToLow = () => {
    const sorted = [...sortedList].sort((a, b) => b.amount - a.amount);
    setSortedList(sorted);
  };

  const sortLowToHigh = () => {
    const sorted = [...sortedList].sort((a, b) => a.amount - b.amount);
    setSortedList(sorted);
  };

  // SEARCH FILTER
  const filteredList = sortedList.filter((item) =>
    item.desc.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Container>
      <Title>Transactions</Title>

      {/* 🔍 SEARCH BOX (kept as you requested) */}
      <SearchInput
        placeholder="Search transactions..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* ⬆⬇ SORT BUTTONS */}
      <SortContainer>
        <SortButton onClick={sortHighToLow}>⬆ High to Low</SortButton>
        <SortButton onClick={sortLowToHigh}>⬇ Low to High</SortButton>
      </SortContainer>

      {/* LIST */}
      <ListContainer>
        {filteredList.map((item, index) => (
          <TransactionCell key={index}>
            <span>{item.desc}</span>
            <AmountText type={item.type}>₹ {item.amount}</AmountText>
          </TransactionCell>
        ))}
      </ListContainer>
    </Container>
  );
};

export default TransactionsComponent;

/* ---------------------- STYLED COMPONENTS ---------------------- */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 16px;
  margin-bottom: 12px;
  border: 1px solid #d1d1d1;
  outline: none;

  &:focus {
    border-color: #0d1d2c;
  }
`;

const SortContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const SortButton = styled.button`
  padding: 6px 12px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  background: #0d1d2c;
  color: white;

  &:hover {
    opacity: 0.85;
  }
`;

const ListContainer = styled.div`
  width: 100%;
`;

const TransactionCell = styled.div`
   background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  width: 97.5%;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")}
`;

const AmountText = styled.span`
  color: ${(props) => (props.type === "EXPENSE" ? "red" : "green")};
  font-weight: 600;
`;
