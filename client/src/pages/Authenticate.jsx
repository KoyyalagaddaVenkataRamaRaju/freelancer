import React, { useState } from "react";
import "../styles/authenticate.css";
import Login from "../components/Login";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Authenticate = () => {
  const [authType, setAuthType] = useState("login");
  const navigate = useNavigate();

  return (
    <div className="AuthenticatePage">

      {/* Animated Background */}
      <div className="auth-bg">
        <span className="bg-glow glow1"></span>
        <span className="bg-glow glow2"></span>
        <span className="bg-glow glow3"></span>
      </div>

      {/* NAVBAR */}
      <motion.div
        className="auth-navbar"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h3 onClick={() => navigate("/")}>SB Works</h3>
        <p onClick={() => navigate("/")}>Home</p>
      </motion.div>

      {/* AUTH CARD */}
      <div className="auth-card-wrapper">
        <AnimatePresence mode="wait">
          {authType === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.35 }}
            >
              <Login setAuthType={setAuthType} />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <Register setAuthType={setAuthType} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default Authenticate;
