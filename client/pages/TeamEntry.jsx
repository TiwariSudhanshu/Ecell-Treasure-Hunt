// TeamEntry.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout'; // Import the layout component
import './TeamEntry.css'; // Import the updated styles

const TeamEntry = () => {
  const [teamId, setTeamId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamId.trim()) {
      setError('');
      navigate(`/team/${teamId}`);
    } else {
      setError('Please enter a valid team ID');
    }
  };

  return (
    <Layout>
      <div className="team-entry-container">
        <h2>Enter Your Team ID</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            placeholder="Enter team ID"
          />
          <button type="submit">Submit</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </Layout>
  );
};

export default TeamEntry;
