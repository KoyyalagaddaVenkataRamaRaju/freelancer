import React, { useEffect } from "react";
import "../styles/landing.css";
import { PiStudent } from "react-icons/pi";
import { FaHandHoldingWater } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem("usertype");
    if (type === "freelancer") navigate("/freelancer");
    else if (type === "client") navigate("/client");
    else if (type === "admin") navigate("/admin");
  }, [navigate]);

  return (
    <div className="landing-page">

      {/* HERO */}
      <section className="landing-hero">

        {/* Overlay */}
        <div className="hero-overlay" />

        {/* NAVBAR */}
        <motion.nav
          className="landing-nav"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="logo">SB Works</h2>

          <button
            className="btn-outline"
            onClick={() => navigate("/authenticate")}
          >
            Sign In
          </button>
        </motion.nav>

        {/* HERO CONTENT */}
        <div className="hero-container">

          {/* TEXT */}
          <motion.div
            className="hero-text"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1>
              Empower Your Journey <br />
              <span>Build. Work. Grow.</span>
            </h1>

            <p>
              SB Works connects freelancers and businesses through a modern
              ecosystem. Discover projects, collaborate globally, and scale
              your professional career.
            </p>

            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => navigate("/authenticate")}
              >
                Get Started
              </button>

              <button
                className="btn-secondary"
                onClick={() => navigate("/authenticate")}
              >
                Join as Freelancer
              </button>
            </div>
          </motion.div>

          {/* FLOATING CARDS */}
          <motion.div
            className="hero-visual"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <div className="floating-card">
              <PiStudent size={36} />
              <h4>Freelancers</h4>
              <p>Find work & build career</p>
            </div>

            <div className="floating-card">
              <FaHandHoldingWater size={36} />
              <h4>Clients</h4>
              <p>Hire top professionals</p>
            </div>

            <div className="floating-card">
              <MdHealthAndSafety size={36} />
              <h4>Secure</h4>
              <p>Protected payments</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose SB Works?
        </motion.h2>

        <div className="features-grid">

          <motion.div className="feature-card" whileHover={{ y: -10 }}>
            <PiStudent size={42} />
            <h3>Skilled Talent</h3>
            <p>Work with verified freelancers worldwide.</p>
          </motion.div>

          <motion.div className="feature-card" whileHover={{ y: -10 }}>
            <FaHandHoldingWater size={42} />
            <h3>Easy Hiring</h3>
            <p>Post projects and get proposals instantly.</p>
          </motion.div>

          <motion.div className="feature-card" whileHover={{ y: -10 }}>
            <MdHealthAndSafety size={42} />
            <h3>Secure Platform</h3>
            <p>Contracts, payments and workflow protection.</p>
          </motion.div>

        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Start Your Freelance Journey Today</h2>
          <button onClick={() => navigate("/authenticate")}>
            Create Account
          </button>
        </motion.div>
      </section>

    </div>
  );
};

export default Landing;
