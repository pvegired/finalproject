import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../firebase.js";
import './LogIn.css';
import { Link } from "react-router-dom";

const LogIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value).catch(function(error) {
        var errorMessage = error.message;
        window.alert(errorMessage);
      });
    } catch (error) {
    }
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
      <p>
          <div>
          <h5> If Haven't Registered, Signup! </h5>
          <Link to="/signup">Sign Up</Link> 
          </div>
        </p>
    </>
  );
};

export default LogIn;