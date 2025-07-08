import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../pages/authHelper/auth';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword , error} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="forgot-password-wrapper"
    >
      <div className="forgot-password-container">
        <h2 className="forgot-password-title">Forgot Password</h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="forgot-password-instructions">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error&& <p>{error}</p>}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="submit-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="spinner" /> : 'Send Reset Link'}
            </motion.button>
          </form>
        ) : (
          <div className="success-message">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="success-icon"
            >
              <Mail className="success-icon-mail" />
            </motion.div>
            <p>
              If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
            </p>
          </div>
        )}
      </div>

      <div className="forgot-password-footer">
        <Link to="/login" className="back-to-login">
          <ArrowLeft className="arrow-left-icon" /> Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
