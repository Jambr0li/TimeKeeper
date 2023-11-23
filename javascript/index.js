import '../styles/styles.css'
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(PieController, ArcElement, Tooltip, Legend);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithEmailAndPassword, GoogleAuthProvider, signOut } from "firebase/auth";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "time-keeper-5ddee.firebaseapp.com",
  projectId: "time-keeper-5ddee",
  storageBucket: "time-keeper-5ddee.appspot.com",
  messagingSenderId: "785074108166",
  appId: "1:785074108166:web:7699dc2636a88c1c661087"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

var ui = new firebaseui.auth.AuthUI(auth);
const uiConfig = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
}


const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithRedirect(auth, googleProvider);
};

const signInWithEmailPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
};

ui.start('#firebaseui-auth-container', uiConfig);


auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('firebaseui-auth-container').style.display = 'none';
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('auth-content').classList.add('hidden');
    // User is signed in
    // ...
    userName.textContent = "Welcome " + user.displayName;
  } else {
    document.getElementById('firebaseui-auth-container').style.display = 'block';
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('auth-content').classList.remove('hidden');
    // User is signed out
    // ...
  }
});

const userName = document.querySelector(".user-name");
const createActivityButton = document.querySelector("#create-new-activity");
const activityNameInput = document.querySelector("#new-activity-name");
const activityTimeSpentInput = document.querySelector("#new-activity-time-spent");
const activityColorInput = document.querySelector("#new-activity-color");
const signOutButton = document.querySelector("#sign-out");

/* User contains:                          */
/* User info like name, bday, and w/e else */
/* Categories created by user.             */
/* Will also contain log in infor from     */
/* Firebase probably.                      */

class User {
  constructor(name) {
    this.name = name;
  }
}

/* Category contains:                          */
/* Category info like name and w/e else        */
/* The different activities within the category*/
/* Total time spent in category                */

class Category {
  labels = [];
  data = [];
  colors = [];

  contructor(label){
    this.label = label;
  }

  addLabel(label,time,color){
    this.labels.push(label);
    this.data.push(time);
    this.colors.push(color);
  }
}


//const user = new User("Jason");

const testCategory = new Category("School");
testCategory.addLabel("CS360", 2, getRandomHexColor());
testCategory.addLabel("CS317", 1.5, getRandomHexColor());
testCategory.addLabel("STATS360", 1, getRandomHexColor());

const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#EAF6FF"];
const blackArray = ["#000000","#000000","#000000","#000000"]

const data = {
  labels: testCategory.labels,
  datasets: [
    {
      label: testCategory.label,
      data: testCategory.data, // Replace with your actual data values
      backgroundColor: testCategory.colors, // Colors for each section
    },
  ],
};

const ctx = document.getElementById("myPieChart").getContext("2d");
const myPieChart = new Chart(ctx, {
  type: "pie",
  data: data,
  options: {
    responsive: true, // Makes the chart responsive
    maintainAspectRatio: true // Adjust aspect ratio according to your need
  }
}); 

// git add .
// git commit -m "message"
// git push origin master



const createActivity = function() {
  const name = activityNameInput.value.trim();
  const time = activityTimeSpentInput.value.trim();
  let color = activityColorInput.value.trim();
  const ret = manageNewActivityInput(activityNameInput,activityTimeSpentInput,activityColorInput,name,time,color);
  if (!ret) return;
  if (color == "") color = getRandomHexColor(); 
  addActivity(testCategory,name,time,color);
}

const manageNewActivityInput = function(el1, el2, el3, content1, content2, content3){
  if (content1 == "") el1.style.borderColor = 'red';
  else el1.style.borderColor = 'black';
  if (content2 == "") el2.style.borderColor = 'red';
  else el2.style.borderColor = 'black';
  if (!isValidHexColor(content3) && content3 !== "") el3.style.borderColor = 'red';
  else el3.style.borderColor = 'black';
  if (!(content1 == "" | content2 == "" | (!isValidHexColor(content3) && content3 !== ""))) {
    activityNameInput.value = "";
    activityTimeSpentInput.value = "";
    activityColorInput.value = "";
    return 1;
  }
  else return 0;
}

const addActivity = function(category,name,time,color){
  if (color == "") color = getRandomHexColor();
  category.addLabel(name,Number(time),color);
  myPieChart.update();
}

function getRandomHexColor() {
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 16).toString(16);
  }
  return color;
}
const isValidHexColor = function(hex) {
  const regex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  return regex.test(hex);
}

// const userSignIn = function(){};

createActivityButton.addEventListener('click',createActivity);

signOutButton.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log("User signed out.");
    // Handle successful sign-out (redirect, show message, etc.)
  }).catch((error) => {
    console.error("Error signing out: ", error);
    // Handle sign-out errors (display error message, etc.)
  });
})