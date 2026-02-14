import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../api";
import "../../styles/client/client.css";
import { useNavigate } from "react-router-dom";
import { FolderKanban } from "lucide-react";

const Client = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/fetch-projects`);
      const pros = res.data.filter(
        (pro) => pro.clientId === localStorage.getItem("userId")
      );
      setProjects(pros);
      setDisplayProjects([...pros].reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterChange = (status) => {
    if (!status) {
      setDisplayProjects([...projects].reverse());
    } else if (status === "Un Assigned") {
      setDisplayProjects(
        projects.filter((p) => p.status === "Available").reverse()
      );
    } else if (status === "In Progress") {
      setDisplayProjects(
        projects.filter((p) => p.status === "Assigned").reverse()
      );
    } else if (status === "Completed") {
      setDisplayProjects(
        projects.filter((p) => p.status === "Completed").reverse()
      );
    }
  };

  return (
    <div className="client-dashboard">

      {/* HEADER */}
      <div className="client-header">
        <div className="header-left">
          <FolderKanban />
          <h2>My Projects</h2>
        </div>

        <select
          className="status-filter"
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Un Assigned">Un Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* PROJECT GRID */}
      <div className="client-project-grid">
        {displayProjects.map((project) => (
          <div
            className="client-project-card"
            key={project._id}
            onClick={() => navigate(`/client-project/${project._id}`)}
          >
            <div className="project-head">
              <h3>{project.title}</h3>
              <span className={`status ${project.status}`}>
                {project.status}
              </span>
            </div>

            <p className="project-desc">{project.description}</p>

            <div className="project-meta">
              <div>
                <span>Budget</span>
                <p>₹ {project.budget}</p>
              </div>

              <div>
                <span>Posted</span>
                <p>{String(project.postedDate).slice(0, 25)}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Client;
