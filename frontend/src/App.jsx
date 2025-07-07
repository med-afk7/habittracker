import { useState ,useEffect } from 'react'
import NavBar from './components/NavBar'
import HabitCard from './components/HabitCard'
import Habits from './pages/Habits'
import { Route, Routes } from "react-router-dom";
import CreateHabit from './pages/CreateHabit';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import EmailVerification from './pages/EmailVerification';
import {Toaster} from 'react-hot-toast'
import { useAuth } from './pages/authHelper/auth';


function App() {
  const [count, setCount] = useState(0)
  const {isChecking , checkAuth , isAuthenticated, user} = useAuth();


	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

  console.log(isAuthenticated);
  console.log(user);


  return (
<>
<NavBar></NavBar>

<Routes>
  <Route path='/signup' element={<SignUp></SignUp>}></Route>
  <Route path='/login' element={<Login></Login>}></Route>
  <Route path='/' element={<Habits></Habits>}></Route>
  <Route path='/create' element={<CreateHabit></CreateHabit>}></Route>
  <Route path='/verify-email' element={<EmailVerification></EmailVerification>}></Route>



</Routes>
<Toaster />

</>
  )
}

export default App
