import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
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
    // Fetch the team data from localStorage
    const storedTeamData = localStorage.getItem("team");
    if (storedTeamData) {
      const parsedData = JSON.parse(storedTeamData);
      const team = parsedData.find((team) => team.teamId === teamId); // Assuming teamId is unique
      setTeamData(team || {});
    }
  }, [teamId]);

  return (
    <Layout>
      <div className="dashboard-container">
        <h2>
          Welcome, Team <span>{teamData.teamName}</span>
        </h2>
        <p>
          This is your dashboard for the treasure hunt. Get ready for your next
          clue!
        </p>
        <div className="team-info">
          <p>
            <strong>Team ID:</strong> {teamData.teamId}
          </p>
          <p>
            <strong>Leader Email:</strong> {teamData.teamLeaderEmail}
          </p>
          <p>
            <strong>Team Leader:</strong> {teamData.teamLeaderName}
          </p>

          <p>
            <strong>2nd Member:</strong> {teamData.secondMember}
          </p>
          <p>
            <strong>3rd Member:</strong> {teamData.thirdMember}
          </p>
          <p>
            <strong>4th Member:</strong> {teamData.fourthMember}
          </p>

          <p>
            <strong>Locations Visited:</strong> {teamData.locationVisited || 0}
          </p>
        </div>
        <div className="clue-box">
          <h3>Your Next Clue:</h3>
          <p>
            {teamData.nextClue ||
              "“I speak without a mouth and hear without ears. I have nobody, but I come alive with the wind.”"}
          </p>
        </div>
        <button className="start-btn" onClick={()=>{
         navigate('/huntstart')
        }}>Start Hunt</button>
      </div>
    </Layout>
  );
};

export default TeamDashboard;
