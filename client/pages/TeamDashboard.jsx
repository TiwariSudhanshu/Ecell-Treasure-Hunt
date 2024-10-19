// TeamDashboard.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout'; // Reuse the layout component
import './TeamDashboard.css'; // Import the new CSS file for dashboard styling

const TeamDashboard = () => {
  const { teamId } = useParams();

  return (
    <Layout>
      <div className="dashboard-container">
        <h2>Welcome, Team <span>{teamId}</span></h2>
        <p>This is your dashboard for the treasure hunt. Get ready for your next clue!</p>

        <div className="clue-box">
          <h3>Your Next Clue:</h3>
          <p>“I speak without a mouth and hear without ears. I have nobody, but I come alive with the wind.”</p>
        </div>

        <button className="start-btn">Start Hunt</button>
      </div>
    </Layout>
  );
};

export default TeamDashboard;
