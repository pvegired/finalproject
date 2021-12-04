import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../firebase.js";

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null);    
  const handleSubmit = (e) => {
    e.preventDefault();    
    const { email, password } = e.target.elements;
    try {
      firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(error){
        var errorMessage = error.message;
        window.alert(errorMessage);
      });      
      setCurrentUser(true);
      /*firebaseConfig.database().ref('users/'+email).set({
          email : email
      })*/

      if (currentUser) {

        return <Redirect to="/dashboard" />;
      }
    } catch (error) {
    }
  };
  if (currentUser) {
      return <Redirect to="/dashboard" />;
  }
 
  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default SignUp