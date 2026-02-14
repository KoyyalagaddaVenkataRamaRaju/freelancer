import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../api";
import { useNavigate } from "react-router-dom";
import "../../styles/client/newProject.css";
import { Briefcase } from "lucide-react";

const NewProject = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/new-project`, {
        title,
        description,
        budget,
        skills,
        clientId: localStorage.getItem("userId"),
        clientName: localStorage.getItem("username"),
        clientEmail: localStorage.getItem("email"),
      });

      navigate("/client");
    } catch (err) {
      alert("Operation failed");
    }
  };

  return (
    <div className="new-project-container">

      <div className="project-form-card">

        <div className="form-header">
          <Briefcase size={22} />
          <h2>Post a New Project</h2>
          <p>Describe your requirements and hire the best freelancer</p>
        </div>

        <div className="form-body">

          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              placeholder="Website development, mobile app, UI design..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Explain your project in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Budget (₹)</label>
              <input
                type="number"
                placeholder="Enter budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Required Skills</label>
              <input
                type="text"
                placeholder="React, Node, UI/UX (comma separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Post Project
          </button>

        </div>
      </div>

    </div>
  );
};

export default NewProject;
