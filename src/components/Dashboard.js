import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../firebase";
import React, { useState, useRef, useEffect, useContext, Component } from "react";
import { getDatabase, ref, onValue, set } from 'firebase/database';

import onDateChange from "./ondatechange";

// import Datemagic from "./datepicker";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Maintenance from "./maintenance.js";
import Bareminimum from "./bareminimum.js";
import Exceed from "./exceed";
import Personal from "./personal";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar} from '@fortawesome/free-solid-svg-icons';

const element = <FontAwesomeIcon icon={faCalendar} />


const Dashboard = () =>  {

const [date, setDate] = useState(new Date());
const [scoreP, setScoreP] = useState(0);
const [scoreM, setScoreM] = useState(0);
const [scoreB, setScoreB] = useState(0);
const [scoreE, setScoreE] = useState(0);
const [finalScore, setFinalScore] = useState(0);

const handlescore = (score) => {
  let a = (score/100)
  setFinalScore(Math.floor(a))
} 

function GetAverageScoreForDay() {
  const db = getDatabase();
  var user = firebaseConfig.auth().currentUser
  var d = new Date();
  var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
  var i = 0;
  var totalScore = 0;

  var reference = ref(db, 'users/' + user.uid +'/'+ datestring+ '/score/');
  onValue(reference, (snapshot) => {
    console.log(i)
    i++
    snapshot.forEach(snapshot1 => {
        var id = snapshot1.val().percentage
        var score = Number(id)
        totalScore = totalScore + (25*score)
        console.log(score)

      //setFinalScore(totalScore)
    });   
    setFinalScore(totalScore)
    handlescore(totalScore)
  });
}

 useEffect(() => {
  GetAverageScoreForDay()
 }, []);

const { currentUser } = useContext(AuthContext);
if (!currentUser) {
  return <Redirect to="/" />;
}



function loghelper(props){
  return console.log(props)
}

return (
    <div className="container">

      {/* html for logo and navigation options */}
      <div className = "navigation">
          <div>
              <a id="logo">Day Quantifier</a>
          </div>
          <nav>
          <ul className = "navlist">
              <li><a>To do</a></li>
              <li><a>Insights</a></li>
              <li><a onClick={() => firebaseConfig.auth().signOut()}>Sign Out</a></li>
          </ul>
          </nav>
      </div>
      {/* html for body text */}
      <div className="text">
        {element}
        
        <p><strong>Date:</strong></p>
         <DatePicker selected={date} onChange={date => setDate(date)} />
         {/* onSelect={onDateChange(date) */}
         

        
        
        <br></br>
        <br></br>
        <br></br>
        <h1>Your current score for the day is {finalScore}/100</h1>
        <br></br>
        <h3>Est. time to finish remaining tasks - 04:30:16</h3>
        {/* <Timer /> */}
        {/* <h3>Time Left for today                                - 08:24:44 <Timer /></h3> */}

      </div>
      <div className="taskcontainer">
      <Personal />
      <Maintenance />
      <Bareminimum />
      <Exceed />
    </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <p>Developed With Music and Love by Pradeep</p>
    <br></br>
    <br></br>
    <br></br>
  </div>
  );
}

export default Dashboard;



