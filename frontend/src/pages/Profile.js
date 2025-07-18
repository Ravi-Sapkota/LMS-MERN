import { useState } from "react";
import API from "../services/api";

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState(storedUser?.fullName || "");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/users/${storedUser.id}`, { fullName: name });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...storedUser, fullName: name })
      );
      alert("Name updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update name");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (newPassword !== confirmPassword) return alert("Passwords do not match");

    try {
      await API.post("/auth/changePassword", {
        email: storedUser.email,
        currentPassword,
        newPassword,
      });
      alert("Password changed successfully");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Profile Settings</h2>

      <form onSubmit={handleNameUpdate} className="mb-4">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          value={name}
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary mt-2">
          Update Name
        </button>
      </form>

      <form onSubmit={handlePasswordChange}>
        <h5>Change Password</h5>
        <input
          type="password"
          placeholder="Current Password"
          className="form-control mb-2"
          value={passwordForm.currentPassword}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              currentPassword: e.target.value,
            })
          }
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="form-control mb-2"
          value={passwordForm.newPassword}
          onChange={(e) =>
            setPasswordForm({ ...passwordForm, newPassword: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="form-control mb-2"
          value={passwordForm.confirmPassword}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              confirmPassword: e.target.value,
            })
          }
          required
        />
        <button type="submit" className="btn btn-warning">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default Profile;
