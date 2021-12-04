import React, { Component } from 'react';
// import Maintenance from "./maintenance.js";
// import Bareminimum from "./bareminimum.js";
// import Exceed from "./exceed";
import Personal from "./personal.js";


function dateStringConverter(props) {
//   const datepicker = <DatePicker
//   selected={date} 
//   onChange={date => setDate(date)}
//    />;

//   let newDate = date;
  const datestring = props.getDate() + "-" + (props.getMonth()+1) + "-" + props.getFullYear();
  return datestring;
}



function onDateChange(props) {

    
    const datestring = dateStringConverter(props);

    return (
        <div>
            <div>
                <br></br>
                <br></br>
                <br></br>
                {/* <h1>Your current score for the day is {finalScore}/100</h1> */}
                <br></br>
                <h3>Est. time to finish remaining tasks - 04:30:16</h3>
                {/* <Timer /> */}
                {/* <h3>Time Left for today                                - 08:24:44 <Timer /></h3> */}

            </div>
            <div className="taskcontainer">
                {Personal(datestring)}
                {/* {Maintenance(props)}
                {Bareminimum(props)}
                {Exceed(props)} */}
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div> 
    );

}

export default onDateChange;
       