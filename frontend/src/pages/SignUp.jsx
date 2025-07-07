import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import PasswordStrengthChecklist from '../components/PasswordStrengthChecklist';
import { User, Mail, Lock , Loader2} from 'lucide-react';
import { Link } from 'react-router-dom';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import {useAuth} from './authHelper/auth'



const SignUp = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const {signup , error , isLoading } = useAuth();

  const isPasswordValid = () => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
   
    if (!isPasswordValid()) return;

    try {
      await signup(email , password , name);
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
      <div className="signup-container">
        <h2>Create Account</h2>

        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

        {error&& <p>{error}</p>}

          <PasswordStrengthChecklist password={password} />


          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
           
            className={!isPasswordValid() ? 'disabled-button' : ''}
            disabled={isLoading}
          >
        {isLoading ? <Loader2  size={24} className="spinner" /> : "Sign Up"}
          </motion.button>
        </form>
         <div className="login-redirect">
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </div>
      </div>

     
    </motion.div>
  );
};

export default SignUp;
