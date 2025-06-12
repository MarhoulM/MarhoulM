import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await register(username, email, password);
    if (!result.success) {
      setError(result.message);
    }
  };
  return (
    <>
      <div className="auth-form-container">
        <h3>Registrace</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reg-username">Uživatelské jméno:</label>
            <input
              type="text"
              id="reg-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Zadejte uživatelské jméno"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reg-email">E-mail:</label>
            <input
              type="email"
              id="reg-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Zadejte email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reg-password">Heslo:</label>
            <input
              type="password"
              id="reg-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Zadejte heslo"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="reg-btn">
            Registrovat
          </button>
        </form>
      </div>
    </>
  );
};
export default Register;
