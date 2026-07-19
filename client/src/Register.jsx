import { useState } from "react";
import axios from "axios";

function Register({ onToggleLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );

      alert(response.data.message);
      onToggleLogin(); // Switch to Login view on success
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Sign up to start organizing your daily tasks</p>
      </div>

      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          className="input-field"
          placeholder="Shahana Fathima"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Email Address</label>
        <input
          type="email"
          className="input-field"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="input-field"
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn-primary-custom" onClick={handleRegister}>
        Sign Up
      </button>

      <div className="auth-footer">
        Already have an account?
        <button className="auth-footer-btn" onClick={onToggleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default Register;