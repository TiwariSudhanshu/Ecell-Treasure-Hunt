import { Route, Routes } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";
import Invalidloc from "./components/InvalidLocn";
import TeamEntry from "./pages/TeamEntry/TeamEntry.jsx";
import TeamDashboard from "./pages/Team Dashboard/TeamDashboard.jsx";
import { useState } from "react";
import Loader from "./components/Loader.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import HuntStart from "./components/Hunt-Start.jsx";
import LocationPage from "./pages/Location/Location.jsx";
import HuntFinish from "./components/Hunt-Finish.jsx";
function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <Routes>
      <Route 
        path="/loader" 
        element={<Loader loading={true} size={150} color="blue" 
        imageSrc="https://www.ecellrgpv.com/assets/img/logo.png" alt="Test" />} 
      />
      <Route path='/leaderboard' element={<Leaderboard/>}/>
      <Route path='/invalidlocation' element={<Invalidloc/>}/>
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
    </>
  );
}

export default App;
