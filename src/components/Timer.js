import React, { Component } from 'react'



class Timer extends Component {
    state = {
        date: new Date()
    };

    //     let today = new Date();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    callMe(){
    setInterval( () => {
        this.setState({date: new Date()});
    },1000);
    }

    render(){
        return(
            <div className="clock">
                {/* <h3>{this.state.date.toLocaleTimeString()}</h3> */}
                {/* <h3>{this.state.date.getHours() + ":" + this.state.date.getMinutes() + ":" + this.state.date.getSeconds()}</h3> */}
                <h3>{"Time Left for today                                -" + " " + (24 - (this.state.date.getHours() + 1)).toString() + ":" + (60 - (this.state.date.getMinutes() + 1)).toString() + ":" + (60 - (this.state.date.getSeconds())).toString()}</h3>
                {this.callMe()}
            </div>
            
        );
        
    }
}

export default Timer;
