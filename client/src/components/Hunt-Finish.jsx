import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import Layout from '../pages/Layout/Layout';

function HuntFinish() {
  const location = useLocation();
  const { locationId } = location.state || {}; // Get locationId from state
  const [teamData, setTeamData] = useState(null);
  const [error, setError] = useState(null);
  const [hasSaved, setHasSaved] = useState(false); // To track if the team has already saved

  // Fetch team ID from local storage
  const storedTeamData = localStorage.getItem("team");
  const teamDataArray = storedTeamData ? JSON.parse(storedTeamData) : [];
  const teamId = teamDataArray.length > 0 ? teamDataArray[0].teamId : null;

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        console.log('Fetching team data for team ID:', teamId); // Log teamId
        const teamCollection = collection(db, "teams");
        const teamQuery = query(teamCollection, where("teamId", "==", teamId)); // Use the teamId from storage
        const teamSnapshot = await getDocs(teamQuery);

        if (!teamSnapshot.empty) {
          const teamArray = [];
          teamSnapshot.forEach((doc) => {
            teamArray.push({ id: doc.id, ...doc.data() });
          });
          setTeamData(teamArray[0]); // Set the fetched team data
          console.log('Fetched team data:', teamArray[0]); // Log fetched data
        } else {
          setError("No team found with this ID");
        }
      } catch (err) {
        console.error("Error fetching team data:", err);
        setError("Failed to fetch team data.");
      }
    };

    fetchTeamData();
  }, [teamId]);

  // Function to check if team data is already saved in leaderboard
  const isTeamAlreadyInLeaderboard = async (teamId) => {
    try {
      const leaderboardCollection = collection(db, "leaderboard");
      const leaderboardQuery = query(leaderboardCollection, where("teamId", "==", teamId));
      const leaderboardSnapshot = await getDocs(leaderboardQuery);
      return !leaderboardSnapshot.empty; // Return true if the team is already in the leaderboard
    } catch (err) {
      console.error("Error checking leaderboard:", err);
      return false; // If there's an error, assume the team isn't saved yet
    }
  };

  // Check if nextLocationId matches locationId
  if (teamData) {
    const { nextLocationId } = teamData; // No need for teamName anymore
    console.log("Next location ID from Firestore:", nextLocationId); // Log next location ID
    console.log("Location ID from state:", locationId); // Log location ID from state

    if (nextLocationId === locationId && !hasSaved) {
      const saveToLeaderboard = async () => {
        // Check if the team is already saved in the leaderboard
        const alreadyInLeaderboard = await isTeamAlreadyInLeaderboard(teamId);
        if (alreadyInLeaderboard) {
          console.log(`Team with ID ${teamId} is already in the leaderboard. No action taken.`);
          setError("You have already finished the hunt.");
          return;
        }

        // Add teamId and timestamp to Firestore leaderboard
        const leaderboardCollection = collection(db, "leaderboard");
        const timestamp = new Date(); // Current date and time
        const dataToSave = {
          teamId, // Use teamId from localStorage, not from Firestore
          timestamp: timestamp,
        };

        try {
          console.log('Adding data to leaderboard:', dataToSave); // Log data before adding
          await addDoc(leaderboardCollection, dataToSave);
          console.log("Data successfully added to leaderboard"); // Confirm addition
          setHasSaved(true); // Mark as saved
        } catch (err) {
          console.error("Error adding to leaderboard:", err);
          setError("Failed to save your completion.");
        }
      };

      // Call the function to add data to leaderboard
      saveToLeaderboard();

      return (
        <Layout>
          <div>
            <h2>Congratulations! You have finished your hunt!</h2>
            <p>Your next location ID matches: {nextLocationId}</p>
            {/* Add any other relevant information you want to display */}
          </div>
        </Layout>
      );
    }
  }

  // Handle loading and error states
  if (error) {
    return (
      <Layout>
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <h2>Hey! It seems your hunt isn't finished for this location.</h2>
        {/* You can add additional info or instructions here */}
      </div>
    </Layout>
  );
}

export default HuntFinish;
