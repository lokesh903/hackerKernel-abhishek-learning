import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import "./signup.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Fix import
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';



function Signup() { // Rename to uppercase (convention for component names)
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password); // Use createUserWithEmailAndPassword correctly
      const date = new Date().getTime();
      const storageRef = ref(storage, `${userName + date}`);
      await uploadBytesResumable(storageRef, file).then(async (snapshot) => { // Use 'snapshot' instead of 'res'
        const downloadURL = await getDownloadURL(storageRef); // Fix function name
        try {
          await updateProfile(res.user, {
            userName: userName, // Use userName instead of displayName
            photoURL: downloadURL,
          });
          await setDoc(doc(db, 'users', res.user.uid), {
            uid: res.user.uid,
            userName: userName, // Use userName instead of displayName
            email:email,
            photoURL: downloadURL,
          });
          navigate('/');
        } catch (err) {
          setErr(true);
          setLoading(false);
        }
      });
    } catch (error) {
      setErr(true);
      setLoading(false);
    }
  };
return (
    <div className="Form_container">
      <div className="formWrapper">
        <span className="logo">Recipe App</span>
        <span className="title">Signup</span>
        <form className="form" onSubmit={handleSubmit}>
          <input className="input" type='text' placeholder="Enter your name" required></input>
          <input className="input" type='email' placeholder="Enter your email" required></input>
          <input className="input" type='password' placeholder="Enter your password" required></input>
          <input style={{ display: 'none' }} className="input" type='file' required id='file'></input>
          <label className="label" htmlFor="file" placeholder="image">
            <img src="URL_TO_YOUR_DEFAULT_AVATAR_IMAGE" alt="Avatar" /> {/* Provide URL to the default avatar image */}
            <span>Add an avatar</span>
          </label>
          <button disabled={loading} className="button" >Sign up</button>
         {err && <span>Somthing went  wrong </span>}
          <p>You do have an account? <Link to="/login">Login</Link> </p>
        </form>
      </div>
    </div>
  );
}

export default Signup; // Rename the component to uppercase (convention for component names)
