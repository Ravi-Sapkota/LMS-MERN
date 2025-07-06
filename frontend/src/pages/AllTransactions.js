import { useEffect, useState } from "react";
import API from "../services/api";

function AllTransactions() {
  const [transactions, setTransactions] = useState([]);

  const fetchAllTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch transactions");
    }
  };

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  return (
    <div className="container mt-4">
      <h2>📋 All Transactions (Admin)</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Book</th>
                <th>Issued</th>
                <th>Due</th>
                <th>Returned</th>
                <th>Fine</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id}>
                  <td>{tx.user?.fullName || "N/A"}</td>
                  <td>{tx.book?.title || "N/A"}</td>
                  <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(tx.dueDate).toLocaleDateString()}</td>
                  <td>
                    {tx.returnDate
                      ? new Date(tx.returnDate).toLocaleDateString()
                      : "Not yet"}
                  </td>
                  <td>{tx.fine || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllTransactions;
