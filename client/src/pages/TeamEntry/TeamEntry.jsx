import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout"; // Import the layout component
import "./TeamEntry.css"; // Import the updated styles
import { ToastContainer, toast } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import TeamDashboard from "../Team Dashboard/TeamDashboard";
import Loader from "../../components/PuffLoader";
import EcellLogo from "../../../public/images/logo.png"


const TeamEntry = () => {
  const [teamId, setTeamId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedTeamData = localStorage.getItem("team");
    if (storedTeamData) {
      setIsLoggedIn(true);
      const teamDataArray = JSON.parse(storedTeamData);
      if (teamDataArray.length > 0) {
        const currentTeamId = teamDataArray[0].teamId;
        setTeamId(currentTeamId);
        navigate(`/team/${currentTeamId}`);
      }
    }
  }, [navigate]);

  const handleAdminClick = () => {
    navigate("/admin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const teamCollection = collection(db, "teams");
      const q = query(teamCollection, where("teamId", "==", teamId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        toast.error("No team with Id");
        return;
      }
      toast.success("Logged in successfully!");
      const teamDataArray = [];
      querySnapshot.forEach((doc) => {
        teamDataArray.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      localStorage.setItem("team", JSON.stringify(teamDataArray));
      console.log("Data stored in localStorage", teamDataArray);
      setIsLoggedIn(true);
      navigate(`/team/${teamId}`);
    } catch (error) {
      console.error("Error fetching document:", error);
    }finally{
      setLoading(true);
    }
  };
  if (loading) return (<>
<div className="flex flex-col h-screen justify-center items-center">

  <Loader loading={true} size={150} color="blue"
  imageSrc={EcellLogo} alt="Test" /> 
  </div>
  </>
  ) 
  if (error) return <p>{error}</p>;

  return (
    <>
      {!isLoggedIn ? (
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
              <button
                className="bg-slate-900 hover:bg-slate-800 py-2 px-8"
                type="submit"
              >
                Submit
              </button>
            </form>
            <div className="mt-4">
              <button
                className="bg-slate-900 hover:underline py-2 px-8"
                onClick={handleAdminClick}
              >
                Admin
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </Layout>
      ) : (
        <>
          <TeamDashboard />
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default TeamEntry;
