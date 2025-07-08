import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import { User, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Login.css'
import {useAuth} from './authHelper/auth'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

const isPasswordValid = () => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  };
 const {login, error , isLoading } = useAuth();

  const handleLogin= async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!isPasswordValid()) return;

   try {
      await login(email , password );
        navigate('/verify-email');
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-container">
        

        <form onSubmit={handleLogin}>
      
            <h2>Log in </h2>

          <Input
            icon={Mail}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

         

          {touched && !isPasswordValid() && (
            <p className="error-message">
              Please meet all password requirements before logging in .
            </p>
          )}

<div className="forgot-password-redirect">
                 
        <Link to="/forgot-password">Forgot password?</Link>
     
      </div>


        {error&& <p>{error}</p>}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!isPasswordValid()}
            className={!isPasswordValid() ? 'disabled-button' : ''}
          >
            Login
          </motion.button>
        </form>

 
            <div className="login-redirect">
                   <p>Don't have an account?</p>
        <Link to="/signup">Signup</Link>
     
      </div>
      </div>

  
    </motion.div>
  )
}

export default Login