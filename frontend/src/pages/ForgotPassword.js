import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const res = await API.post("/auth/forgotPassword", form);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Password reset failed");
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
        <h3 className="text-center mb-4">Forgot Password</h3>
        <form onSubmit={handleSubmit}>
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
            name="newpassword"
            type="password"
            placeholder="New Password"
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-2"
            name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary w-100">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
