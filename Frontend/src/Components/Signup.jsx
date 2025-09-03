import React, { useState } from 'react'
import axios from "axios";
import "../App.css";
import {Link, useNavigate} from "react-router-dom"
const  Signup = () => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username,email,password);
        axios.post(`http://localhost:4000/auth/signup`,{
          username,
          email,
          password
        }).then(response => {
          if(response.data.status){
            console.log(response);
            navigate("/login")
          }
        })
        .catch(err => console.log(err));
    }
  return (
    <div className='sign-up-container'>
        <form className="sign-up-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label htmlFor="username">Username:</label>
            <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>

            <label htmlFor="email">Email</label>
            <input type="email" autoComplete='off' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="password">Password:</label>
            <input type='password' placeholder='******' onChange={(e) => setPassword(e.target.value)}/>

            <button type="submit">Submit</button>
            <p>Have an Account?</p> <Link to="/login">LogIn</Link>
        </form>
    </div>
  )
}

export default  Signup