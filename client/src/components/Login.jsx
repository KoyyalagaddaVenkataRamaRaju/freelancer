import React, { useContext, useState } from "react";
import { GeneralContext } from "../context/GeneralContext";
import { Eye, EyeOff, LogIn } from "lucide-react";

const Login = ({ setAuthType }) => {
  const { setEmail, setPassword, login } = useContext(GeneralContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <form className="authForm" onSubmit={handleLogin}>
      
      {/* HEADER */}
      <div className="auth-header">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">
          Login to access your dashboard and continue your work.
        </p>
      </div>

      {/* EMAIL */}
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="email"
          className="form-control"
          id="loginEmail"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="loginEmail">Email address</label>
      </div>

      {/* PASSWORD */}
      <div className="form-floating mb-2 authFormInputs position-relative">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          id="loginPassword"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="loginPassword">Password</label>

        {/* TOGGLE PASSWORD */}
        <span
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </div>

      {/* FORGOT */}
      <div className="forgot-row">
        <span>Forgot password?</span>
      </div>

      {/* SUBMIT */}
      <button type="submit" className="auth-btn">
        <LogIn size={18} />
        Sign In
      </button>

      {/* SWITCH */}
      <p className="switch-auth">
        New to SB Works?{" "}
        <span onClick={() => setAuthType("register")}>
          Create account →
        </span>
      </p>
    </form>
  );
};

export default Login;
