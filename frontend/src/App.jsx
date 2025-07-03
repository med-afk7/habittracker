import { useState } from 'react'
import NavBar from './components/NavBar'
import HabitCard from './components/HabitCard'
import Habits from './pages/Habits'
import { Route, Routes } from "react-router-dom";
import CreateHabit from './pages/CreateHabit';

function App() {
  const [count, setCount] = useState(0)

  return (
<>
<NavBar></NavBar>

<Routes>
  <Route path='/' element={<Habits></Habits>}></Route>
  <Route path='/create' element={<CreateHabit></CreateHabit>}></Route>
</Routes>

</>
  )
}

export default App
