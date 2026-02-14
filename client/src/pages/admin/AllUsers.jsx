import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../api";
import "../../styles/admin/allUsers.css";
import { Users, Mail, UserCheck, Shield } from "lucide-react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/fetch-users`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleIcon = (role) => {
    if (role === "admin") return <Shield size={16} />;
    if (role === "freelancer") return <UserCheck size={16} />;
    return <Users size={16} />;
  };

  return (
    <div className="users-page">

      <div className="users-header">
        <h2>User Management</h2>
        <p>View and manage platform users</p>
      </div>

      <div className="users-grid">
        {users.map((user) => (
          <div className="user-card" key={user._id}>

            <div className="user-card-top">
              <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>

              <div>
                <h4>{user.username}</h4>
                <p className="user-email">
                  <Mail size={14} /> {user.email}
                </p>
              </div>
            </div>

            <div className="user-details">
              <div>
                <span>User ID</span>
                <p>{user._id}</p>
              </div>

              <div>
                <span>Role</span>
                <p className={`role-badge ${user.usertype}`}>
                  {getRoleIcon(user.usertype)} {user.usertype}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default AllUsers;
