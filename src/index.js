import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


// const MAINTENANCE = [
//   { id: "todo-0", name: "6 hrs of Sleep", completed: true },
//   { id: "todo-1", name: "40 mins of Exercise", completed: false },
//   { id: "todo-2", name: "15 mins of Meditation", completed: false }
// ];

// const BAREMINIMUM = [
//   { id: "todo-0", name: "Attend All Classes", completed: true },
//   { id: "todo-1", name: "3hrs of Assignments", completed: false },
//   { id: "todo-2", name: "1hr of Job Search Efforts", completed: false }
// ];

// const EXCEED = [
//   { id: "todo-0", name: "Publish a Blog", completed: true },
//   { id: "todo-1", name: "1 hr of Coursera", completed: false },
// ];

ReactDOM.render(
  <React.StrictMode>
    <App/>

  </React.StrictMode>,
  document.getElementById('root')
);
