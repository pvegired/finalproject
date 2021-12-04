import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCBZmV5hJZiUdnzqbkYYei35PcAkpIzBZs",
  authDomain: "lifeinnumbers-7adc7.firebaseapp.com",
  projectId: "lifeinnumbers-7adc7",
  storageBucket: "lifeinnumbers-7adc7.appspot.com",
  messagingSenderId: "118769306081",
  appId: "1:118769306081:web:8a68d8c3fed35952a76aa0"
});

/*var database = firebase.database();
var ref  = database.ref('users');
var data = {
    name : "abc",
    score :23
}
//ref.push(data);*/
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider(); 
export {auth , provider};

export default firebaseConfig;