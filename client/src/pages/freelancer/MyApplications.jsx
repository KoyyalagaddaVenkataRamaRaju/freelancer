import React, { useEffect, useState } from "react";
import "../../styles/freelancer/MyApplications.css";
import axios from "axios";
import API_URL from "../../api";
import { Briefcase, Send } from "lucide-react";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API_URL}/fetch-applications`);
      setApplications(
        res.data
          .filter(
            (app) =>
              app.freelancerId === localStorage.getItem("userId")
          )
          .reverse()
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="my-applications-page">

      <div className="applications-header">
        <h2>My Applications</h2>
        <p>Track proposals and project bids</p>
      </div>

      <div className="applications-grid">
        {applications.map((application) => (
          <div className="application-card" key={application._id}>

            {/* PROJECT SIDE */}
            <div className="application-section">
              <div className="section-header">
                <Briefcase size={16} />
                <h4>Project</h4>
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

              <p className="budget">
                Budget: ₹ {application.budget}
              </p>
            </div>

            {/* PROPOSAL SIDE */}
            <div className="application-section">
              <div className="section-header">
                <Send size={16} />
                <h4>My Proposal</h4>
              </div>

              <p className="proposal">{application.proposal}</p>

              <div className="skills">
                {application.freelancerSkills.map((skill) => (
                  <span key={skill} className="skill-chip green">
                    {skill}
                  </span>
                ))}
              </div>

              <p className="budget">
                Bid: ₹ {application.bidAmount}
              </p>

              <div className={`status ${application.status}`}>
                {application.status}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default MyApplications;
