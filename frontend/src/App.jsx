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
import LoadingSpinner from './components/LoadingSpinner';
import ForgotPassword  from './pages/ForgotPassword';
import ResetPasswordPage from './pages/ResetPasswordPage';
import MonthHabits from './pages/MonthHabits';
import Dashboard from './pages/Dashboard';




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
  const { isCheckingAuth  , checkAuth , isAuthenticated, user} = useAuth();


	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

if (isCheckingAuth)return <LoadingSpinner/>


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
  <Route path='/' element={<ProtectedRoute><Habits/></ProtectedRoute>}></Route>
  <Route path='/create' element={<ProtectedRoute><CreateHabit></CreateHabit></ProtectedRoute>}></Route>
  <Route path='/verify-email' element={<EmailVerification></EmailVerification>}></Route>
  <Route path='/forgot-password' element={<RedirectAuthenticatedUser><ForgotPassword></ForgotPassword></RedirectAuthenticatedUser>}></Route>
  <Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

          <Route
					path='/dashboard'
					element={
            <ProtectedRoute>			
            <Dashboard></Dashboard>
            </ProtectedRoute>
					}
				/>
				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />

</Routes>
<Toaster />

</>
  )
}

export default App
