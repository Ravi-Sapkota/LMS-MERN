import { useEffect, useState } from "react";
import API from "../services/api";

function MyBooks() {
  const [transactions, setTransactions] = useState([]);

  const fetchMyBooks = async () => {
    try {
      const res = await API.get("/transactions/my");
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch issued books", err);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Issued Books</h2>
      {transactions.length === 0 ? (
        <p>No books issued.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Issued On</th>
                <th>Due Date</th>
                <th>Returned?</th>
                <th>Fine</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id}>
                  <td>{tx.book?.title || "N/A"}</td>
                  <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(tx.dueDate).toLocaleDateString()}</td>
                  <td>{tx.returnDate ? "Yes" : "No"}</td>
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

export default MyBooks;
