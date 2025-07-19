import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MyBooks from "./pages/MyBooks";
import AllTransactions from "./pages/AllTransactions";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import AddBook from "./pages/AddBook";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/mybooks" element={<MyBooks />} />
          <Route path="/transactions" element={<AllTransactions />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/addBook" element={<AddBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
