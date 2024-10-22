import { Route, Routes } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";
import Invalidloc from "./components/InvalidLocn";
import Login from "./pages/TeamLogin/TeamLogin.jsx";
import TeamEntry from "./pages/TeamEntry/TeamEntry.jsx";
import TeamDashboard from "./pages/Team Dashboard/TeamDashboard.jsx";
import { useState } from "react";
import Admin from "./pages/Admin/Admin.jsx";
import HuntStart from "./components/Hunt-Start.jsx";
import LocationPage from "./pages/Location/Location.jsx";
import HuntFinish from "./components/Hunt-Finish.jsx";
import PuffLoader from "./components/PuffLoader";
import "./App.css";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Routes>
      <Route
        path="/loader"
        element={
          <div className="loader-container">
            <PuffLoader
              loading={true}
              size={130}
              imageSrc="/images/logo.png"
              color="#4b79a1"
            />
          </div>
        }
      />{" "}
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/invalidlocation" element={<Invalidloc />} />
      <Route path="/" element={<TeamEntry />} />
      <Route path="/huntstart" element={<HuntStart />} />
      <Route path="/huntfinish" element={<HuntFinish />} />
      <Route path="/team/:teamId" element={<TeamDashboard />} />
      <Route path="/location/:locationId" element={<LocationPage />} />
      <Route
        path="/admin"
        element={<Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
      />
    </Routes>
  );
}

export default App;
