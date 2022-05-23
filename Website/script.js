// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase,ref,onValue,set } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHZTAVaACjoTXeAMMDhQ9_jZ1tkgl56zQ",
  authDomain: "plantwatering-6d1f6.firebaseapp.com",
  databaseURL: "https://plantwatering-6d1f6-default-rtdb.firebaseio.com",
  projectId: "plantwatering-6d1f6",
  storageBucket: "plantwatering-6d1f6.appspot.com",
  messagingSenderId: "1064864716880",
  appId: "1:1064864716880:web:3d20f52ec71157ec981955",
  measurementId: "G-WSRXCCPWS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const app1 = initializeApp({
//     databaseURL: "https://plantwatering-6d1f6-default-rtdb.firebaseio.com"
//   });

import {
	getFirestore,
	doc,
	getDoc,
	getDocs,
	collection,
	query,
	setDoc,
	deleteDoc,
    addDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

const db = getDatabase(app);
// const db1 = getDatabase(app1);
//--------------------------Import---------------------------------------

// var express = require('express');
// var app = express();
// var port = 8000;
// var admin = require("firebase-admin");

// var serviceAccount = require("C:/Users/Acer/Dropbox/Temp/Crepupito/Website/plantwatering-6d1f6-firebase-adminsdk-bbvyl-dd8429ea25.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://plantwatering-6d1f6-default-rtdb.firebaseio.com"
// });

// app.use(express.json());
// app.use(express.static('public'));

// const database = admin.database();
// const usersRef = database.ref('/users');


// const starCountRef = ref(db, 'posts/' + postId + '/starCount');
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });

// set(ref(db), {
//   username: 'name',
//   email: 'emaill',
//   profile_picture : 'imageUrl'
// });

//--------------------------Realtime------------------------------------

var alertsound = document.getElementById('alert-sound');
var loginok = document.getElementById('login-ok');

async function updateSoil(val){
    var prog = document.getElementById("progresssoil");
    prog.parentNode.style.width = `${val}%`;
    if(val > 40){
        prog.parentNode.style.backgroundColor = "#55e9d5";
    }else {
        prog.parentNode.style.backgroundColor = "#e06031";
    }
    prog.innerText = `${val}%`;
    document.getElementById("soilvalue").innerText = val;
}

async function updateAir(val){
    var prog = document.getElementById("progressair");
    if(val < 100){
        prog.parentNode.style.width = `${val}%`;
    }else {
        prog.parentNode.style.width = `100%`;
    }
    if(val > 40){
        prog.parentNode.style.backgroundColor = "#55e9d5";
    }else {
        prog.parentNode.style.backgroundColor = "#e06031";
    }
    prog.innerText = `${val}%`;
    document.getElementById("airvalue").innerText = val;
}

async function updateTemp(val){
    var prog = document.getElementById("progresstemp");
    if(val < 50){
        prog.parentNode.style.width = `${val*2}%`;
    }else {
        prog.parentNode.style.width = `100%`;
    }
    if(val > 25){
        prog.parentNode.style.backgroundColor = "#e06031";
    }else {
        prog.parentNode.style.backgroundColor = "#55e9d5"; 
    }
    prog.innerText = `${val} ํC`;
    document.getElementById("tempvalue").innerText = val;
}

// setTimeout(function(){
//     updateSoil(70);
//     updateAir(20);
//     updateTemp(40);
//     setTimeout(function(){
//         updateSoil(0);
//         updateAir(80);
//         updateTemp(10);
//     }, 500); 
// }, 500); 
// window.updateSoil = updateSoil;

var dataref = await ref(db);
var data
// while(true){
    await onValue(dataref, (snapshot) => {
        data = (snapshot.val());
        console.log(data);
        updateSoil(data.soilhumid);
        updateAir(data.airhumid);
        updateTemp(data.temp);
    });
// }

/*Dropdown Menu*/
// $('.dropdown').click(function () {
//     $(this).attr('tabindex', 1).focus();
//     $(this).toggleClass('active');
//     $(this).find('.dropdown-menu').slideToggle(300);
// });
// $('.dropdown').focusout(function () {
//     $(this).removeClass('active');
//     $(this).find('.dropdown-menu').slideUp(300);
// });
// $('.dropdown .dropdown-menu li').click(function () {
//     $(this).parents('.dropdown').find('span').text($(this).text());
//     $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
// });
/*End Dropdown Menu*/