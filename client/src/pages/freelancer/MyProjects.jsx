import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../api";
import { useNavigate } from "react-router-dom";
import { FolderKanban } from "lucide-react";
import "../../styles/freelancer/MyProjects.css";

const MyProjects = () => {
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
        (pro) => pro.freelancerId === localStorage.getItem("userId")
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
    } else if (status === "In Progress") {
      setDisplayProjects(
        projects.filter((project) => project.status === "Assigned").reverse()
      );
    } else if (status === "Completed") {
      setDisplayProjects(
        projects.filter((project) => project.status === "Completed").reverse()
      );
    }
  };

  return (
    <div className="my-projects-page">

      {/* HEADER */}
      <div className="projects-header">
        <div className="header-left">
          <FolderKanban />
          <h2>My Projects</h2>
        </div>

        <select
          className="status-filter"
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* PROJECT LIST */}
      <div className="projects-grid">
        {displayProjects.map((project) => (
          <div
            className="project-card"
            key={project._id}
            onClick={() => navigate(`/project/${project._id}`)}
          >
            <div className="project-card-head">
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
                <span>Date</span>
                <p>{project.postedDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MyProjects;
