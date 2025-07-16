import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center vh-10 p-4 shadow gap-4"
      style={{
        background: "linear-gradient(to left, #4d4 30%, #007bff 50%)",
        width: "800px",
        borderRadius: "10px",
      }}
    >
      <div
        className="card p-4 border-0"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="m-1 text-center">
          Don’t have an account? <a href="/register">Register</a>
        </p>
        <p className="m-0 text-center">
          <a href="/forgotPassword">Forgot Password?</a>
        </p>
      </div>
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
    </div>
  );
}

export default Login;
