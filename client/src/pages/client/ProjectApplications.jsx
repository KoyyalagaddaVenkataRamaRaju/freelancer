import React, { useEffect, useState } from "react";
import "../../styles/client/ClientApplications.css";
import axios from "axios";
import API_URL from "../../api";
import { UserCheck, UserX, Briefcase } from "lucide-react";

const ProjectApplications = () => {
  const [applications, setApplications] = useState([]);
  const [displayApplications, setDisplayApplications] = useState([]);
  const [projectTitles, setProjectTitles] = useState([]);
  const [projectFilter, setProjectFilter] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API_URL}/fetch-applications`);
      const clientApps = res.data.filter(
        (application) =>
          application.clientId === localStorage.getItem("userId")
      );

      setApplications(clientApps);
      setDisplayApplications([...clientApps].reverse());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (applications.length > 0) {
      const titles = [];
      applications.forEach((app) => {
        if (!titles.includes(app.title)) titles.push(app.title);
      });
      setProjectTitles(titles);
    }
  }, [applications]);

  const handleApprove = async (id) => {
    await axios.get(`${API_URL}/approve-application/${id}`);
    fetchApplications();
  };

  const handleReject = async (id) => {
    await axios.get(`${API_URL}/reject-application/${id}`);
    fetchApplications();
  };

  const handleFilterChange = (value) => {
    setProjectFilter(value);

    if (!value) {
      setDisplayApplications([...applications].reverse());
    } else {
      setDisplayApplications(
        applications.filter((app) => app.title === value).reverse()
      );
    }
  };

  return (
    <div className="client-applications-page">

      {/* HEADER */}
      <div className="applications-header">
        <div className="header-left">
          <Briefcase />
          <h2>Project Applications</h2>
        </div>

        <select
          className="project-filter"
          value={projectFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="">All Projects</option>
          {projectTitles.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>

      {/* GRID */}
      <div className="applications-grid">
        {displayApplications.map((application) => (
          <div className="application-card" key={application._id}>

            {/* LEFT SIDE — PROJECT */}
            <div className="application-side">
              <h3>{application.title}</h3>
              <p className="desc">{application.description}</p>

              <div className="skills">
                {application.requiredSkills.map((skill) => (
                  <span key={skill} className="skill red">
                    {skill}
                  </span>
                ))}
              </div>

              <p className="budget">Budget ₹ {application.budget}</p>
            </div>

            {/* RIGHT SIDE — FREELANCER */}
            <div className="application-side">
              <h4>Freelancer Proposal</h4>
              <p className="proposal">{application.proposal}</p>

              <div className="skills">
                {application.freelancerSkills.map((skill) => (
                  <span key={skill} className="skill green">
                    {skill}
                  </span>
                ))}
              </div>

              <p className="budget">Bid ₹ {application.bidAmount}</p>

              <div className="actions">
                {application.status === "Pending" ? (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(application._id)}
                    >
                      <UserCheck size={16} /> Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => handleReject(application._id)}
                    >
                      <UserX size={16} /> Decline
                    </button>
                  </>
                ) : (
                  <span className={`status ${application.status}`}>
                    {application.status}
                  </span>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ProjectApplications;
