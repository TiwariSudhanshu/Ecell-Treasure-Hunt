import React, { useState } from "react";


// Sample data of teams 
const teams = [
  { 
    name: "Team A", 
    locationsVisited: 5, 
    latestLocation: "2024-10-19 00:10:22" 
  },
  { 
    name: "Team B", 
    locationsVisited: 3, 
    latestLocation: "2024-10-19 00:09:10" 
   },
  { 
    name: "Team C", 
    locationsVisited: 4, 
    latestLocation: "2024-10-19 00:11:15" },
];

const teamDetails = {
  "Team A": [
    { 
        location: "Admin Block", 
        timestamp: "2024-10-19 00:08:00" 
    }, 
    { 
        location: "Uit block", 
        timestamp: "2024-10-19 00:08:00" 
    }, 
    { 
        location: "Canteen", 
        timestamp: "2024-10-19 00:08:00" 
    } 
  ],
  "Team B": [
    { 
        location: "Library", 
        timestamp: "2024-10-19 00:08:30" 
    },
    { 
        location: "Soit", 
        timestamp: "2024-10-19 00:08:30" 
    },
  ],
  "Team C": [
    { location: "Sports Complex", timestamp: "2024-10-19 00:09:42" },
    { location: "Library", timestamp: "2024-10-19 00:09:42" },
    { location: "Soit", timestamp: "2024-10-19 00:09:42" },
  ],
};

const TreasureHunt = () => {
  const [selectedView, setSelectedView] = useState("leaderboard");
  const [selectedTeam, setSelectedTeam] = useState("");

  return (
    
    <div className="pt-8 pr-8 pl-8 h-screen bg-blue-950">
      <h1 className="text-3xl font-bold mb-4 text-white">Treasure Hunt Event</h1>
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 mr-2 font-semibold rounded ${
            selectedView === "leaderboard"
              ? "bg-blue-800 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedView("leaderboard")}
        >
          Leaderboard
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded ${
            selectedView === "teamInfo"
              ? "bg-blue-800 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedView("teamInfo")}
        >
          Team Info
        </button>
      </div>

      {selectedView === "leaderboard" && (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">Leaderboard</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-blue-400 text-left">
                  Team Name
                </th>
                <th className="py-2 px-4 border-b border-blue-400 text-left">
                  Locations Visited
                </th>
                <th className="py-2 px-4 border-b border-blue-400  text-left">
                  Latest Location
                </th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.name}>
                  <td className="py-2 px-4 border-b  border-blue-400 text-left">
                    {team.name}
                  </td>
                  <td className="py-2 px-4 border-b  border-blue-400 text-left">
                    {team.locationsVisited}
                  </td>
                  <td className="py-2 px-4 border-b  border-blue-400 text-left">
                    {team.latestLocation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedView === "teamInfo" && (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">Team Info</h2>
          <select
            className="block w-full p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="">Select a Team</option>
            {Object.keys(teamDetails).map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
          {selectedTeam && (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b  border-blue-400 text-left">
                    Location
                  </th>
                  <th className="py-2 px-4 border-b  border-blue-400 text-left">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                {teamDetails[selectedTeam].map((detail, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-purple-400 text-left">
                      {detail.location}
                    </td>
                    <td className="py-2 px-4 border-b border-purple-400 text-left">
                      {detail.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      <footer className="text-center pb-3 pt-7  text-white">
        <p> 2024 Treasure Hunt</p>
      </footer>
    </div>
    
  );
};

export default TreasureHunt;
