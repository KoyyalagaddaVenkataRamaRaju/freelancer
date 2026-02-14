import React, { useEffect, useState } from "react";
import "../../styles/admin/allApplications.css";
import axios from "axios";
import API_URL from "../../api";
import { Briefcase, User, CheckCircle2, Clock, XCircle } from "lucide-react";

const AllApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API_URL}/fetch-applications`);
      setApplications([...res.data].reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusIcon = (status) => {
    if (status === "Accepted") return <CheckCircle2 size={16} />;
    if (status === "Rejected") return <XCircle size={16} />;
    return <Clock size={16} />;
  };

  return (
    <div className="applications-page">

      <div className="applications-header">
        <h2>Applications Review</h2>
        <p>Monitor freelancer proposals and project applications</p>
      </div>

      <div className="applications-grid">
        {applications.map((application) => (
          <div className="application-card" key={application._id}>

            {/* PROJECT INFO */}
            <div className="application-section project-section">
              <div className="section-header">
                <Briefcase size={18} />
                <h4>Project Details</h4>
              </div>

              <h3>{application.title}</h3>
              <p className="desc">{application.description}</p>

              <div className="skills">
                {application.requiredSkills.map((skill) => (
                  <span key={skill} className="skill-chip red">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="meta">
                <p><strong>Budget:</strong> ₹{application.budget}</p>
                <p><strong>Client:</strong> {application.clientName}</p>
                <p><strong>Email:</strong> {application.clientEmail}</p>
              </div>
            </div>

            {/* FREELANCER INFO */}
            <div className="application-section freelancer-section">
              <div className="section-header">
                <User size={18} />
                <h4>Freelancer Proposal</h4>
              </div>

              <p className="proposal">{application.proposal}</p>

              <div className="skills">
                {application.freelancerSkills.map((skill) => (
                  <span key={skill} className="skill-chip green">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="meta">
                <p><strong>Bid:</strong> ₹{application.bidAmount}</p>
                <p><strong>Name:</strong> {application.freelancerName}</p>
                <p><strong>Email:</strong> {application.freelancerEmail}</p>
              </div>

              <div className={`status-badge ${application.status}`}>
                {getStatusIcon(application.status)}
                {application.status}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApplications;
