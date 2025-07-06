import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await API.get("/admin/summary");
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch summary", err);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <div className="row mt-3">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Books</h5>
              <p className="card-text fs-4">{summary.books}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text fs-4">{summary.users}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Transactions</h5>
              <p className="card-text fs-4">{summary.transactions}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Fines</h5>
              <p className="card-text fs-4">Rs. {summary.fines}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
