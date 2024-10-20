import { Route, Routes } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";
import Invalidloc from "./components/InvalidLocn";
import TeamEntry from "./teamEntry";
import TeamDashboard from "./teamDashboard";
import { useState } from "react";
import Admin from "./pages/Admin/Admin.jsx";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <Routes>
        <Route
          path="/admin"
          element={<Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/invalidlocation" element={<Invalidloc />} />
        <Route path="/" element={<TeamEntry />} />
        <Route path="/team/:teamId" element={<TeamDashboard />} />
      </Routes>
    </>
  );
}

export default App;
