import React, { useContext } from "react";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(GeneralContext);

  const usertype = localStorage.getItem("usertype");

  const menuItems = {
    freelancer: [
      { label: "Dashboard", path: "/freelancer" },
      { label: "All Projects", path: "/all-projects" },
      { label: "My Projects", path: "/my-projects" },
      { label: "Applications", path: "/myApplications" }
    ],
    client: [
      { label: "Dashboard", path: "/client" },
      { label: "New Project", path: "/new-project" },
      { label: "Applications", path: "/project-applications" }
    ],
    admin: [
      { label: "Home", path: "/admin" },
      { label: "All Users", path: "/all-users" },
      { label: "Projects", path: "/admin-projects" },
      { label: "Applications", path: "/admin-applications" }
    ]
  };

  if (!usertype) return null;

  return (
    <motion.div
      className="navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="nav-left">
        <h2 onClick={() => navigate("/")}>
          SB Works {usertype === "admin" && <span>(Admin)</span>}
        </h2>
      </div>

      <div className="nav-options">
        {menuItems[usertype].map((item, index) => (
          <p key={index} onClick={() => navigate(item.path)}>
            {item.label}
          </p>
        ))}

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Navbar;
