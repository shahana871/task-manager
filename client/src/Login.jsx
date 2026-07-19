import { useState } from "react";
import axios from "axios";

function Login({ onLogin, onToggleRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      onLogin();
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Please sign in to manage your tasks</p>
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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn-primary-custom" onClick={handleLogin}>
        Sign In
      </button>

      <div className="auth-footer">
        Don't have an account?
        <button className="auth-footer-btn" onClick={onToggleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;