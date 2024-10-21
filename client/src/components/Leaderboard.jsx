import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase"; // Ensure you have Firebase initialized

const TreasureHunt = () => {
  const [selectedView, setSelectedView] = useState("leaderboard");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teams, setTeams] = useState([]);
  const [teamDetails, setTeamDetails] = useState({});

  // Fetch team data and leaderboard from Firestore
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // Fetch team data from 'teams' collection
        const teamCollection = collection(db, "teams");
        const teamSnapshot = await getDocs(teamCollection);

        // Prepare team data structure
        const teamData = {};
        const tempTeams = [];

        // For each team, fetch leaderboard timestamp
        for (const doc of teamSnapshot.docs) {
          const team = doc.data();
          const teamId = team.teamId;

          // Fetch the latest timestamp from the leaderboard collection
          const leaderboardQuery = query(
            collection(db, "leaderboard"),
            where("teamId", "==", teamId)
          );
          const leaderboardSnapshot = await getDocs(leaderboardQuery);

          // Extract the latest timestamp (assuming leaderboard data is already sorted or you only get one record)
          let latestTimestamp = "";
          if (!leaderboardSnapshot.empty) {
            const leaderboardData = leaderboardSnapshot.docs[0].data();
            latestTimestamp = leaderboardData.timestamp.toDate().toString(); // Convert Firestore Timestamp to Date
          }

          // Build team data with additional details like contact and email
          teamData[team.teamName] = {
            teamId: team.teamId,
            contact: team.contact,
            email: team.email,
            locationDetails: [
              ...(teamData[team.teamName]?.locationDetails || []),
              {
                location: team.location,
                timestamp: latestTimestamp,
              },
            ],
          };

          // Add teams to a temporary array for leaderboard
          tempTeams.push({
            teamId,
            teamName: team.teamName,
            latestLocation: latestTimestamp || "No recent activity",
          });
        }

        // Sort team details and leaderboard by timestamp (oldest first)
        for (const key in teamData) {
          teamData[key].locationDetails.sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );
        }

        setTeamDetails(teamData);

        // Sort leaderboard by the latestLocation timestamp (oldest first)
        const sortedTeams = tempTeams.sort(
          (a, b) => new Date(a.latestLocation) - new Date(b.latestLocation)
        );
        setTeams(sortedTeams);
      } catch (error) {
        console.error("Error fetching team or leaderboard data:", error);
      }
    };

    fetchTeamData();
  }, []); // This will run on every component refresh

  return (
    <div className="pt-8 pr-8 pl-8 h-screen bg-blue-950">
      <h1 className="text-3xl font-bold mb-4 text-white">Treasure Hunt Event</h1>
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 mr-2 font-semibold rounded ${
            selectedView === "leaderboard"
              ? "bg-blue-800 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setSelectedView("leaderboard")}
        >
          Leaderboard
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded ${
            selectedView === "teamInfo"
              ? "bg-blue-800 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setSelectedView("teamInfo")}
        >
          Team Info
        </button>
      </div>

      {selectedView === "leaderboard" && (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">Leaderboard</h2>
          <table className="min-w-full bg-white text-black">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-blue-400 text-left">
                  Team Name
                </th>
                <th className="py-2 px-4 border-b border-blue-400 text-left">
                  Latest Location Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.teamId}>
                  <td className="py-2 px-4 border-b border-blue-400 text-left">
                    {team.teamName}
                  </td>
                  <td className="py-2 px-4 border-b border-blue-400 text-left">
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
            className="block w-full p-2 mb-4 border text-black border-gray-300 rounded"
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
            <div>
              <h3 className="text-xl font-bold text-white">
                Team Name: {selectedTeam}
              </h3>
             
              <table className="min-w-full text-black bg-white mt-4">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-purple-400 text-left">
                      Location
                    </th>
                    <th className="py-2 px-4 border-b border-purple-400 text-left">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teamDetails[selectedTeam].locationDetails.map(
                    (detail, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b border-purple-400 text-left">
                          {detail.location}
                        </td>
                        <td className="py-2 px-4 border-b border-purple-400 text-left">
                          {detail.timestamp}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <footer className="text-center pb-3 pt-7 text-white">
        <p> 2024 Treasure Hunt</p>
      </footer>
    </div>
  );
};

export default TreasureHunt;
