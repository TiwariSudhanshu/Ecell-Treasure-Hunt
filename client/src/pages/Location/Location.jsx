import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";  
import { db } from "../../firebase";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import Layout from "../Layout/Layout";
import Loader from "../../components/Loader";

const LocationPage = () => {
  const { locationId } = useParams(); 
  const navigate = useNavigate(); 
  const [locationData, setLocationData] = useState(null);
  const [nextClue, setNextClue] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamData, setTeamData] = useState(null); 

  // Fetch team ID from local storage
  const storedTeamData = localStorage.getItem("team");
  const teamDataArray = storedTeamData ? JSON.parse(storedTeamData) : [];
  const teamId = teamDataArray.length > 0 ? teamDataArray[0].teamId : null;

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const locationCollection = collection(db, "locations");
        const locationQuery = query(locationCollection, where("locationId", "==", locationId.toLowerCase()));
        const locationSnapshot = await getDocs(locationQuery);

        if (locationSnapshot.empty) {
          setError("No location found with this ID");
          setLoading(false);
          return;
        }

        const locationArray = [];
        locationSnapshot.forEach((doc) => {
          locationArray.push({ id: doc.id, ...doc.data() });
        });

        setLocationData(locationArray[0]);
        await fetchTeamData(); // Fetch team data after getting location data

      } catch (err) {
        setError("Failed to fetch location data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchTeamData = async () => {
      try {
        const teamCollection = collection(db, "teams");
        const teamQuery = query(teamCollection, where("teamId", "==", teamId)); // Use the teamId from storage
        const teamSnapshot = await getDocs(teamQuery);

        if (!teamSnapshot.empty) {
          const teamArray = [];
          teamSnapshot.forEach((doc) => {
            teamArray.push({ id: doc.id, ...doc.data() });
          });

          const team = teamArray[0];
          setTeamData(team);
          
          // Check if the locationId matches the nextLocationId
          if (locationId.toLowerCase() !== team.nextLocationId.toLowerCase()) {
            navigate("/invalidlocation"); // Navigate to /invalidlocation
            return;
          }
          
          updateNextLocation(team); // Update the next location
        } else {
          setError("No team found with this ID");
        }
      } catch (err) {
        setError("Failed to fetch team data.");
      }
    };

    const updateNextLocation = async (team) => {
      const { nextLocationId, locations } = team; 
      const currentIndex = locations.indexOf(nextLocationId);

      if (currentIndex !== -1 && currentIndex < locations.length - 1) {
        const newNextLocationId = locations[currentIndex + 1]; // New next location ID
        
        await fetchNextLocationClue(newNextLocationId);

        // Update nextLocationId in Firestore
        const teamDocRef = doc(db, "teams", team.id); // Reference to the team document
        await updateDoc(teamDocRef, { nextLocationId: newNextLocationId }); // Update the document
      } else {
        setNextClue("No more locations available.");
        navigate("/huntfinish",{ state: { locationId } });
      }
    };

    const fetchNextLocationClue = async (nextLocationId) => {
      try {
        const locationCollection = collection(db, "locations");
        const nextLocationQuery = query(locationCollection, where("locationId", "==", nextLocationId));
        const nextLocationSnapshot = await getDocs(nextLocationQuery);

        if (!nextLocationSnapshot.empty) {
          const nextLocationArray = [];
          nextLocationSnapshot.forEach((doc) => {
            nextLocationArray.push({ id: doc.id, ...doc.data() });
          });

          // Get a random hint from the location data
          const hints = [nextLocationArray[0].hint1, nextLocationArray[0].hint2, nextLocationArray[0].hint3];
          const randomClue = hints[Math.floor(Math.random() * hints.length)];
          setNextClue(randomClue); 
        } else {
          setNextClue("No clue available for the next location.");
        }
      } catch (err) {
        setError("Failed to fetch next location clue.");
      }
    };

    fetchLocationData();
  }, [locationId, navigate, teamId]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div>
        <h2>Congratulations! You are at the right location</h2>
        
        <h2>Next Location Clue</h2>
        <p>{nextClue}</p>
      </div>
    </Layout>
  );
};

export default LocationPage;
