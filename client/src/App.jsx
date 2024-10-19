<<<<<<< HEAD
import { Route,  Routes } from "react-router-dom"
import Leaderboard from './components/Leaderboard'
import Invalidloc from './components/InvalidLocn'

=======
import { Route,  Routes } from "react-router-dom";
import TeamEntry from "./teamEntry";;
import TeamDashboard from "./teamDashboard";
>>>>>>> 053918f06639387001e7864b9ca0c0a9bbbf724e
function App() {

  return (
    <>
      <Routes>
<<<<<<< HEAD
      <Route path='/' element={<h1>Hey</h1>}/>
      <Route path='/leaderboard' element={<Leaderboard/>}/>
      <Route path='/invalidlocation' element={<Invalidloc/>}/>
=======
    
      <Route path="/" element={<TeamEntry />} />
      <Route path="/team/:teamId" element={<TeamDashboard />} />
>>>>>>> 053918f06639387001e7864b9ca0c0a9bbbf724e
      </Routes>
    </>
  )
}

export default App
