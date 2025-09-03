import React, { useState } from 'react'
import axios from "axios";
import "../App.css";
import {Link, useNavigate} from "react-router-dom"

const  Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email,password);
        axios.post(`http://localhost:4000/auth/login`,{
          email,
          password
        }).then(response => {
          if(response.data.status){
            console.log(response);
            navigate("/")
          }
        })
        .catch(err => console.log(err));
    }
  return (
    <div className='sign-up-container'>
        <form className="sign-up-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label htmlFor="email">Email</label>
            <input type="email" autoComplete='off' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="password">Password:</label>
            <input type='password' placeholder='******' onChange={(e) => setPassword(e.target.value)}/>

            <button type="submit">Go to Home</button>
            <Link to="/forgotPassword">Forgot Password?</Link>
            <p>Don't Have an Account?</p> <Link to="/signup">SignUp</Link>
        </form>
    </div>
  )
}

export default  Login;