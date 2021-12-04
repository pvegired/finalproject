import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import {auth , provider}  from '../firebase.js';
import { Redirect } from "react-router-dom";


const Home = () => {
  const { currentUser } = useContext(AuthContext);
    // Sign in with google
    const signin = () => {
      auth.signInWithPopup(provider).catch(alert);
  }
  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className = "homecontainer">
      <div id="divLogin" class="login_screen">
      <h3>Experience the Magic of Quantification!</h3>
      <br></br>
      <br></br>
      {currentUser ? (
        <p>
          You are logged - <Link to="/dashboard">View Dashboard</Link>
        </p>
      ) : (
        <p>

        {/* <div class="container">
  
        <div id="divLogin" class="login_screen">
          <h2 id="spnLogin">Sign In</h2>
          <input id="txtLoginId" type="text" placeholder="Email Id" />
          <input id="txtLoginPass" type="password" placeholder="Password" />
          <a Link to="/login" class="btn">
            Log In
          </a>
          <a class="homepagebutton"  onClick={signin}>Sign In with Google</a>
        </div>

      </div> */}


          <div>
          <Link to="/login" class="homepagebutton">Log In</Link> 
          <br></br>
          <Link to="/signup" class="homepagebutton">Sign Up</Link> 
          </div>
          {/* <p> OR </p> */}
          <br></br>
          <div>
          {<button onClick={signin} class="homepagebutton">Sign In with Google</button> }
            {/* <Link to={signin}>Sign In with Google</Link> */}
          </div>
        </p>
      )}
      </div>
    </div>
  );
};

export default Home;