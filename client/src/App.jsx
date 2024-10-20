<<<<<<< HEAD

import { Route,  Routes } from "react-router-dom"
import Leaderboard from './components/Leaderboard'
import Invalidloc from './components/InvalidLocn'
import TeamDashboard from "../pages/teamDashboard";
import TeamEntry from "../pages/teamEntry";
import Login from "../pages/Login";
import Loader from './components/Loader';
=======
import { Route, Routes } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";
import Invalidloc from "./components/InvalidLocn";
import TeamEntry from "./pages/TeamEntry.jsx";
import TeamDashboard from "./pages/TeamDashboard.jsx";
import { useState } from "react";
import Admin from "./pages/Admin/Admin.jsx";
>>>>>>> 4640afb49750012256204462b4eabf3cd16a9f6b

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <Routes>
<<<<<<< HEAD
      <Route path="/loader" element={<Loader loading={true} size={150} color="blue" imageSrc="https://www.ecellrgpv.com/assets/img/logo.png" alt="Test" />} />
      <Route path='/leaderboard' element={<Leaderboard/>}/>
      <Route path='/invalidlocation' element={<Invalidloc/>}/>
      <Route path="/" element={<TeamEntry />} />
      <Route path="/team/:teamId" element={<TeamDashboard />} />
      <Route path="/login" element={<Login />} />
      
=======
        <Route
          path="/admin"
          element={<Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/invalidlocation" element={<Invalidloc />} />
        <Route path="/" element={<TeamEntry />} />
        <Route path="/team/:teamId" element={<TeamDashboard />} />
>>>>>>> 4640afb49750012256204462b4eabf3cd16a9f6b
      </Routes>
    </>
  );
}

export default App;
