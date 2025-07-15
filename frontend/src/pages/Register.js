import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center vh-10 p-4 shadow gap-4"
      style={{
        background: "linear-gradient(to right, #4d4 30%, #007bff 50%",
        width: "800px",
        borderRadius: "10px",
      }}
    >
      <div
        className="card p-4 border-0"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">Library Management System (LMS)</h3>
        <img
          alt="library bookshelves"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/SanDiegoCityCollegeLearningResource_-_bookshelf.jpg/1200px-SanDiegoCityCollegeLearningResource_-_bookshelf.jpg"
        ></img>
      </div>
      <div
        className="card p-4 border-0"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-2"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-2"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <select
            className="form-control mb-2"
            name="role"
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button className="btn btn-primary w-100">Register</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
