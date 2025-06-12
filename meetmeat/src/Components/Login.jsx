import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(username, password);
    if (!result.success) {
      setError(result.message);
    }
  };
  return (
    <>
      <div className="login-form-card">
        <h3>Přihlášení</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username-login">Uživatelské jméno:</label>
            <input
              type="text"
              id="username-login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Zadejte Vaše uživatelské jméno"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password-login">Heslo:</label>
            <input
              id="password-login"
              type="password"
              placeholder="Zadejte své heslo."
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-btn">
            Přihlásit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
