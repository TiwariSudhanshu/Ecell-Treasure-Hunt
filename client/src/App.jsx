
import { Route,  Routes } from "react-router-dom"
import Leaderboard from './components/Leaderboard'
import Invalidloc from './components/InvalidLocn'
import TeamEntry from "./teamEntry";
import TeamDashboard from "./teamDashboard";

function App() {

  return (
    <>
      <Routes>
      <Route path='/leaderboard' element={<Leaderboard/>}/>
      <Route path='/invalidlocation' element={<Invalidloc/>}/>
      <Route path="/" element={<TeamEntry />} />
      <Route path="/team/:teamId" element={<TeamDashboard />} />
      </Routes>
    </>
  )
}

export default App
