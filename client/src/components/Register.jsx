import React, { useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";

const Register = ({ setAuthType }) => {
  const {
    setUsername,
    setEmail,
    setPassword,
    setUsertype,
    register,
  } = useContext(GeneralContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    await register();
  };

  return (
    <form className="authForm" onSubmit={handleRegister}>
      
      {/* TITLE */}
      <h2 className="auth-title">Create Account</h2>
      <p className="auth-subtitle">
        Join SB Works and start your freelance journey today.
      </p>

      {/* USERNAME */}
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="text"
          className="form-control"
          id="registerUsername"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="registerUsername">Username</label>
      </div>

      {/* EMAIL */}
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="email"
          className="form-control"
          id="registerEmail"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="registerEmail">Email address</label>
      </div>

      {/* PASSWORD */}
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="password"
          className="form-control"
          id="registerPassword"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="registerPassword">Password</label>
      </div>

      {/* USER TYPE */}
      <select
        className="form-select auth-select mb-3"
        onChange={(e) => setUsertype(e.target.value)}
        required
      >
        <option value="">Select user type</option>
        <option value="freelancer">Freelancer</option>
        <option value="client">Client</option>
        <option value="admin">Admin</option>
      </select>

      {/* SUBMIT */}
      <button type="submit" className="auth-btn">
        Create Account
      </button>

      {/* SWITCH */}
      <p className="switch-auth">
        Already have an account?{" "}
        <span onClick={() => setAuthType("login")}>
          Login →
        </span>
      </p>
    </form>
  );
};

export default Register;
