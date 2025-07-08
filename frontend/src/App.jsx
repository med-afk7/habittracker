import { useState ,useEffect} from 'react'
import NavBar from './components/NavBar'
import HabitCard from './components/HabitCard'
import Habits from './pages/Habits'
import { Route, Routes , Navigate} from "react-router-dom";
import CreateHabit from './pages/CreateHabit';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import EmailVerification from './pages/EmailVerification';
import {Toaster} from 'react-hot-toast'
import { useAuth } from './pages/authHelper/auth';



const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};


const RedirectAuthenticatedUser = ({children}) =>{
  const {isAuthenticated ,user } = useAuth();

  if(isAuthenticated && user.isVerified){
    return <Navigate to ="/" replace/>
  }

  return children;
}


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
  <Route path='/signup' 
  element={
  <RedirectAuthenticatedUser>
    <SignUp></SignUp>
    </RedirectAuthenticatedUser>
  }></Route>
  <Route path='/login' element={<
    RedirectAuthenticatedUser>
    <Login></Login>
    </RedirectAuthenticatedUser>}></Route>
  <Route path='/' element={<Habits></Habits>}></Route>
  <Route path='/create' element={<CreateHabit></CreateHabit>}></Route>
  <Route path='/verify-email' element={<EmailVerification></EmailVerification>}></Route>



</Routes>
<Toaster />

</>
  )
}

export default App
