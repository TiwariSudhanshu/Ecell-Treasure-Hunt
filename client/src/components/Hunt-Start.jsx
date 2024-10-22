import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure Firestore is configured
// import Layout from '../pages/Layout/Layout';
import Loader from './Loader';
import Layout from '../pages/Layout/Layout';
import "./Hunt-Start.css";

function HuntStart() {
  const [clue, setClue] = useState("");
  const [loading, setLoading] = useState(true);

  const storedTeamData = localStorage.getItem("team");
  const teamDataArray = storedTeamData ? JSON.parse(storedTeamData) : [];
  const teamId = teamDataArray.length > 0 ? teamDataArray[0].teamId : null;
  useEffect(() => {
    const fetchClue = async () => {
      try {
        const teamQuery = query(
          collection(db, "teams"), 
          where("teamId", "==", teamId) 
        );
        
        const teamSnapshot = await getDocs(teamQuery);

        if (!teamSnapshot.empty) {
          const teamDoc = teamSnapshot.docs[0]; 
          const { nextLocationId } = teamDoc.data(); 

          const locationQuery = query(
            collection(db, "locations"),
            where("locationId", "==", nextLocationId)
          );

          const locationSnapshot = await getDocs(locationQuery);

          if (!locationSnapshot.empty) {
            const locationData = locationSnapshot.docs[0].data();
            console.log("Location document data:", locationData);
            const hints = [locationData.hint1, locationData.hint2, locationData.hint3];
            const randomHint = hints[Math.floor(Math.random() * hints.length)];
            
            setClue(randomHint);
          } else {
            console.log("No matching location found!");
          }
        } else {
          console.log("No such team found!");
        }
      } catch (error) {
        console.error("Error fetching clue: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClue();
  }, [teamId]);

  if (loading) {
    return <Loader/>;
  }

  return (
    <Layout>
      <div className='container'>
        <h1>Hunt has been started</h1>
        <div>Your clue:</div>
        <h2>{clue ? clue : "No clue available"}</h2>
        <h2>Go to your clue location to proceed</h2>
      </div>
    </Layout>
  );
}

export default HuntStart;
