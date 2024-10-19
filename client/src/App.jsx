import { Route,  Routes } from "react-router-dom";
import TeamEntry from "./teamEntry";;
import TeamDashboard from "./teamDashboard";
function App() {

  return (
    <>
      <Routes>
    
      <Route path="/" element={<TeamEntry />} />
      <Route path="/team/:teamId" element={<TeamDashboard />} />
      </Routes>
    </>
  )
}

export default App
