import React, { useState } from 'react'
import {motion} from "framer-motion"
import Input from '../components/Input';
import {User , Mail , Lock ,}  from "lucide-react"
import{Link} from "react-router-dom"
import './signup.css'

const SignUp = () => {

const [name , setName] = useState('')
const [email , setEmail] = useState('')
const [password , setPassword] = useState('')

const handleSignUp = (e) => {
    e.preventDefault();
}


  return (
    <motion.div
    initial={{opacity:0 , y :20}}
    animate={{opacity:1 , y:0}}
    transition={{duration:0.5}}
    >
        <div className='signup-container'>
            <h2>Create Account</h2>

            


            <form onSubmit={handleSignUp}>
             
                    <Input icon={User}
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange= {(e) =>setName(e.target.value)}
                />
               
                 <Input icon={Mail}
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange= {(e) =>setEmail(e.target.value)}
                />

                
                 <Input icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange= {(e) =>setPassword(e.target.value)}
                />

                <motion.button 
                    whileHover={{scale:1.02}}
                    whileTap={{scale:0.98}}
                    type='submit'
                >Sign Up</motion.button>

               
            </form>
 <div className='login-redirect'>

<p>Already have an account?</p>
<Link to={"/login"}> Login</Link>
        </div>
        
        </div>

       

        
    </motion.div>
  )
}

export default SignUp