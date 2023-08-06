import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import "./signup.css";
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      localStorage.setItem('key', 'true');
    } catch (err) {
       setErr(true);
     }
  }
  return (
    <div className="Form_container">
      <div className="formWrapper">
        <span className="logo">Recipe App</span>
        <span className="title">Login</span>
          <form className="form" onSubmit={handleSubmit}>
          <input className="input" type='email' placeholder="Enter your email" required />
          <input className="input" type='password' placeholder="Enter your password" required />
          <button className="button" type="submit">Login</button>
          {err && <span>Something went wrong</span>}
          <p>You don't have an account? <Link to="/signup">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
