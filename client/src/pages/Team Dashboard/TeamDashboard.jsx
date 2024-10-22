import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaIdBadge } from "react-icons/fa"; // Import icons
import Layout from "../Layout/Layout";
import "./teamDashboard.css";

const TeamDashboard = () => {
  const { teamId } = useParams();
  const [teamData, setTeamData] = useState({
    teamName: "",
    teamLeaderEmail: "",
    teamLeaderName: "",
    secondMember: "",
    thirdMember: "",
    fourthMember: "",
    teamId: "",
    locationVisited: 0,
    nextClue: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedTeamData = localStorage.getItem("team");
    if (storedTeamData) {
      const parsedData = JSON.parse(storedTeamData);
      const team = parsedData.find((team) => team.teamId === teamId);
      setTeamData(team || {});
    }
  }, [teamId]);

  return (
    <Layout>
      <div className="dashboard-container">
        {/* Team ID and Email at the top */}
        <div className="team-header">
          <h2> Team ID: <span className="team-id">{teamData.teamId}</span></h2>
          <p className="flex gap-1 items-center content-center justify-center"><FaEnvelope />: {teamData.teamLeaderEmail}</p>
        </div>

        {/* Team members - two on the left, two on the right */}
        <div className="team-members">
            <p className="p-2"><FaUser /> <strong>Team Leader:</strong> <span className="member-name">{teamData.teamLeaderName}</span></p>
            <p className="p-2"><FaUser /> <strong>2nd Member:</strong> <span className="member-name">{teamData.secondMember}</span></p>
            <p className="p-2"><FaUser /> <strong>3rd Member:</strong> <span className="member-name">{teamData.thirdMember}</span></p>
            <p className="p-2"><FaUser /> <strong>4th Member:</strong> <span className="member-name">{teamData.fourthMember}</span></p>
        </div>


        {/* Locations Visited */}
        <div className="team-info">
          <p><strong>Locations Visited:</strong> {teamData.locationVisited || 0}</p>
        </div>

        <button
          className="start-btn"
          onClick={() => {
            navigate("/huntstart", {
              state: {
                teamData: teamData, // Pass the team data
              },
            });
          }}
        >
          Start Hunt
        </button>
        <button id="logout" onClick={()=>{
          localStorage.removeItem("team");
          navigate("/")
        }}>Logout</button>
      </div>
    </Layout>
  );
};

export default TeamDashboard;