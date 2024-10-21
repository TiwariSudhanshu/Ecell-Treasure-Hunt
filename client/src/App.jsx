import { Route, Routes } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";
import Invalidloc from "./components/InvalidLocn";
import TeamDashboard from "./pages/TeamDashboard";
import TeamEntry from "./pages/TeamEntry.jsx";
import Login from "./pages/Login.jsx";
import Loader from "./components/Loader";

import { useState } from "react";
import Admin from "./pages/Admin/Admin.jsx";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <Routes>
        <Route
          path="/loader"
          element={
            <Loader
              loading={true}
              size={150}
              color="blue"
              imageSrc="https://www.ecellrgpv.com/assets/img/logo.png"
              alt="Test"
            />
          }
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/invalidlocation" element={<Invalidloc />} />
        <Route path="/" element={<TeamEntry />} />
        <Route path="/team/:teamId" element={<TeamDashboard />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={<Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
        />
      </Routes>
    </>
  );
}

export default App;
