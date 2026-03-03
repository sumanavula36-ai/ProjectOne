import React, { useState, useEffect } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get("/transactions").then((res) => setTransactions(res.data));
  }, []);

  return (
    <div>
      <h2>Banking Operations Dashboard</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.type} - {t.amount} - {t.status}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Dashboard;
