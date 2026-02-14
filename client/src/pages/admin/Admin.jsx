import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../api";
import { FolderKanban, CheckCircle2, FileText, Users } from "lucide-react";
import "../../styles/admin/admin.css";

const Admin = () => {
  const navigate = useNavigate();

  const [projectsCount, setProjectsCount] = useState(0);
  const [completedProsCount, setCompletedProsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetchProjects();
    fetchApplications();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/fetch-projects`);
      setProjectsCount(res.data.length);
      const completed = res.data.filter((pro) => pro.status === "Completed");
      setCompletedProsCount(completed.length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API_URL}/fetch-applications`);
      setApplicationsCount(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/fetch-users`);
      setUsersCount(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <p>Overview of platform activity and statistics</p>
      </div>

      <div className="dashboard-grid">

        <div className="stat-card">
          <div className="stat-icon"><FolderKanban /></div>
          <div>
            <h4>Total Projects</h4>
            <p>{projectsCount}</p>
          </div>
          <button onClick={() => navigate("/admin-projects")}>
            View Projects →
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-icon green"><CheckCircle2 /></div>
          <div>
            <h4>Completed Projects</h4>
            <p>{completedProsCount}</p>
          </div>
          <button onClick={() => navigate("/admin-projects")}>
            View Projects →
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue"><FileText /></div>
          <div>
            <h4>Applications</h4>
            <p>{applicationsCount}</p>
          </div>
          <button onClick={() => navigate("/admin-applications")}>
            View Applications →
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple"><Users /></div>
          <div>
            <h4>Total Users</h4>
            <p>{usersCount}</p>
          </div>
          <button onClick={() => navigate("/all-users")}>
            View Users →
          </button>
        </div>

      </div>
    </div>
  );
};

export default Admin;
