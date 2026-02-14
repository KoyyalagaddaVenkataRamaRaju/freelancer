import React, { useEffect, useState } from "react";
import "../../styles/freelancer/freelancer.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../api";
import { Briefcase, CheckCircle2, FileText, Wallet } from "lucide-react";

const Freelancer = () => {
  const navigate = useNavigate();

  const [isDataUpdateOpen, setIsDataUpdateOpen] = useState(false);
  const [freelancerData, setFreelancerData] = useState();
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState("");
  const [freelancerId, setFreelancerId] = useState("");
  const [updateSkills, setUpdateSkills] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [applicationsCount, setApplicationsCount] = useState([]);

  useEffect(() => {
    fetchUserData(localStorage.getItem("userId"));
    fetchApplications();
  }, []);

  const fetchUserData = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/fetch-freelancer/${id}`);
      setFreelancerData(res.data);

      if (res.data) {
        setFreelancerId(res.data._id);
        setSkills(res.data.skills);
        setDescription(res.data.description);
        setUpdateSkills(res.data.skills);
        setUpdateDescription(res.data.description);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateUserData = async () => {
    try {
      await axios.post(`${API_URL}/update-freelancer`, {
        freelancerId,
        updateSkills,
        description: updateDescription,
      });
      fetchUserData(localStorage.getItem("userId"));
      setIsDataUpdateOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API_URL}/fetch-applications`);
      setApplicationsCount(
        res.data.filter(
          (application) =>
            application.freelancerId === localStorage.getItem("userId")
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {freelancerData && (
        <div className="freelancer-dashboard">

          {/* STAT CARDS */}
          <div className="stats-grid">

            <div className="stat-card">
              <Briefcase />
              <div>
                <h4>Current Projects</h4>
                <p>{freelancerData.currentProjects.length}</p>
              </div>
              <button onClick={() => navigate("/my-projects")}>
                View →
              </button>
            </div>

            <div className="stat-card">
              <CheckCircle2 />
              <div>
                <h4>Completed</h4>
                <p>{freelancerData.completedProjects.length}</p>
              </div>
              <button onClick={() => navigate("/my-projects")}>
                View →
              </button>
            </div>

            <div className="stat-card">
              <FileText />
              <div>
                <h4>Applications</h4>
                <p>{applicationsCount.length}</p>
              </div>
              <button onClick={() => navigate("/myApplications")}>
                View →
              </button>
            </div>

            <div className="stat-card">
              <Wallet />
              <div>
                <h4>Funds</h4>
                <p>₹ {freelancerData.funds}</p>
              </div>
            </div>

          </div>

          {/* PROFILE PANEL */}
          <div className="profile-panel">

            {!isDataUpdateOpen ? (
              <div className="profile-view">

                <div className="profile-section">
                  <h4>Skills</h4>
                  <div className="skills">
                    {skills.length > 0 ? (
                      skills.map((skill) => (
                        <span key={skill} className="skill-chip">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p>No skills added</p>
                    )}
                  </div>
                </div>

                <div className="profile-section">
                  <h4>Description</h4>
                  <p>{description || "Add your professional summary"}</p>
                </div>

                <button
                  className="edit-btn"
                  onClick={() => setIsDataUpdateOpen(true)}
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="profile-edit">

                <div className="form-group">
                  <label>Skills</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updateSkills}
                    onChange={(e) => setUpdateSkills(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    value={updateDescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                  />
                </div>

                <div className="edit-actions">
                  <button className="save-btn" onClick={updateUserData}>
                    Save Changes
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setIsDataUpdateOpen(false)}
                  >
                    Cancel
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      )}
    </>
  );
};

export default Freelancer;
