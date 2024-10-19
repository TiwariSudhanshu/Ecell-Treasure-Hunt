
import { Route,  Routes } from "react-router-dom"
import Leaderboard from './components/Leaderboard'
import Invalidloc from './components/InvalidLocn'
import TeamDashboard from "../pages/teamDashboard";
import TeamEntry from "../pages/teamEntry";
import Login from "../pages/Login";

function App() {

  return (
    <>
      <Routes>
      <Route path='/leaderboard' element={<Leaderboard/>}/>
      <Route path='/invalidlocation' element={<Invalidloc/>}/>
      <Route path="/" element={<TeamEntry />} />
      <Route path="/team/:teamId" element={<TeamDashboard />} />
      <Route path="/login" element={<Login />} />
      
      </Routes>
    </>
  )
}

export default App
