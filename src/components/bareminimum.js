import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../firebase";
import React, { useState, useRef, useEffect, useContext } from "react";
import Form from "./Form";
import FilterButton from "./FilterButton";
import Todo from "./Todo";
import { nanoid } from 'nanoid';
import { getDatabase, ref, onValue, set } from 'firebase/database';



/*const BAREMINIMUM = [
  { id: "todo-0", name: "Attend All Classes", completed: true },
  { id: "todo-1", name: "3hrs of Assignments", completed: false },
  { id: "todo-2", name: "1hr of Job Search Efforts", completed: false }
];*/

const BAREMINIMUM = [];

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const Bareminimum = () =>  {

const [date, setDate] = useState(new Date());

const [tasks, setTasks] = useState(BAREMINIMUM);
const [filter, setFilter] = useState('All');
const [count, setCount] = useState(0);

function fetchDataFromFirebase() {
  const db = getDatabase();
  var user = firebaseConfig.auth().currentUser
  var d = new Date();
  var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
  const reference = ref(db, 'users/' + user.uid +'/'+ datestring+ '/bareminimum/');
  let todoslist = [];
  let todomap = {};
  var i = 0;
  onValue(reference, (snapshot) => {
    snapshot.forEach(snapshot1 => {
      var id = snapshot1.val().todoid
      const name = snapshot1.val().name
      const completed = snapshot1.val().completed
      var todoid = String(id)
      if (todoid.includes("todo") === true) {
        todomap = {
          id: id,
          name: name,
          completed: completed
        };
        todoslist.push(todomap)
      }
    });   
    setTasks(todoslist)
  });
}


function CalculatePersonalScore() {
  const db = getDatabase();
  var user = firebaseConfig.auth().currentUser
  var d = new Date();
  var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
  const reference = ref(db, 'users/' + user.uid +'/'+ datestring+ '/bareminimum/');
  let todoslist = [];
  let todomap = {};
  var completedTasks = 0;
  var totalTaskCount = 0 ;
  onValue(reference, (snapshot) => {
    snapshot.forEach(snapshot1 => {
      var id = snapshot1.val().todoid
      var todoid = String(id)
    const completed = snapshot1.val().completed
    if (todoid.includes("todo") === true) {
      if (completed === true) {
    
        completedTasks++
      }
      totalTaskCount++
    }
    });   
  });
  var per = 0
  var percentage = 0
  if (totalTaskCount > 0) {
    per = (completedTasks/totalTaskCount) * 100
    percentage = Math.floor(per)
  }
  setCount(percentage)
  const reference1 = ref(db, 'users/' + user.uid +'/'+ datestring+ '/score/bareminimumpercentage/');
  set(reference1, {
    percentage: percentage,
  });
}

function toggleTaskCompleted(id) {
  const updatedTasks = tasks.map(task => {
    // if this task has the same ID as the edited task
    if (id === task.id) {
      // use object spread to make a new obkect
      // whose `completed` prop has been inverted
      const db = getDatabase();
      var user = firebaseConfig.auth().currentUser
      var d = new Date();
      var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
      const reference = ref(db, 'users/' + user.uid +'/'+ datestring+ '/bareminimum/' + id);
      set(reference, {
        todoid: task.id,
        name : task.name,
        completed : !task.completed
      });
      return {...task, completed: !task.completed}
    }
    return task;
  });
  //setTasks(updatedTasks);
  fetchDataFromFirebase();
  CalculatePersonalScore();
}


function deleteTask(id) {
  const remainingTasks = tasks.filter(task => id !== task.id);
  //setTasks(remainingTasks);
  const db = getDatabase();
  var user = firebaseConfig.auth().currentUser
  var d = new Date();
  var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
  const reference = ref(db, 'users/' + user.uid +'/'+ datestring+ '/bareminimum/'+ id);
  set(reference, {
    id: null
  });
  fetchDataFromFirebase();
}


function editTask(id, newName) {
  const editedTaskList = tasks.map(task => {
  // if this task has the same ID as the edited task
    if (id === task.id) {
      //
      const db = getDatabase();
      var user = firebaseConfig.auth().currentUser
      var d = new Date();
      var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
      const reference = ref(db, 'users/' + user.uid +'/'+ datestring+ '/bareminimum/'+ task.id);
      set(reference, {
        todoid: task.id,
        name : newName,
        completed : task.completed
      });
      return {...task, name: newName}
    }
    return task;
  });
  //setTasks(editedTaskList);
  fetchDataFromFirebase();
}

const taskList = tasks
.filter(FILTER_MAP[filter])
.map(task => (
  <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
  />
));

const filterList = FILTER_NAMES.map(name => (
  <FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
));


function addTask(name) {
  const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
  //setTasks([...tasks, newTask]);
    //Database related
    const db = getDatabase();
    var user = firebaseConfig.auth().currentUser
    var d = new Date();
    var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
    const reference = ref(db, 'users/' + user.uid +'/'+ datestring+ '/bareminimum/'+ newTask.id);
    set(reference, {
      todoid: newTask.id,
      name : newTask.name,
      completed : newTask.completed
    });
    fetchDataFromFirebase();
}


const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
const headingText = `${taskList.length} ${tasksNoun} remaining`;

const listHeadingRef = useRef(null);
const prevTaskLength = usePrevious(tasks.length);

useEffect(() => {
  fetchDataFromFirebase();
  CalculatePersonalScore();
  if (tasks.length - prevTaskLength === -1) {
    listHeadingRef.current.focus();
  }
}, [tasks.length, prevTaskLength]);

const { currentUser } = useContext(AuthContext);
if (!currentUser) {
  return <Redirect to="/" />;
}

let Progress = (props) => {
  return (
    <div className="Progress" data-value={props.value}>
      <div
        className="Progress-Bar"
        style={{
          width: `${props.value}%`,
          backgroundSize: `${100 * 100 / props.value}% 100%`
        }}        
      ></div>
    </div>
  );
};

return (
    <div>
      <div className="todoapp stack-large">
        <h1>Bare Minimum</h1>
        <Progress value={count} />
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  </div>
  );
}

export default Bareminimum;


