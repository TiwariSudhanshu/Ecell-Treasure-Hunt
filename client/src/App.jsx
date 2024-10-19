import { Route,  Routes } from "react-router-dom"
import Leaderboard from './components/Leaderboard'
import Invalidloc from './components/InvalidLocn'

function App() {

  return (
    <>
      <Routes>
      <Route path='/' element={<h1>Hey</h1>}/>
      <Route path='/leaderboard' element={<Leaderboard/>}/>
      <Route path='/invalidlocation' element={<Invalidloc/>}/>
      </Routes>
    </>
  )
}

export default App
