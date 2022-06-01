// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase,ref,onValue,update,get } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//-------------------------------------RealtimeUpdate------------------------------------

var ReqHumid = 40;
var waterok = 0;
var orange = "#f79767";
var blue = "#92bff8";
var green = "#a0c88e";

async function updateSoil(val){
    var prog = document.getElementById("progresssoil");
    if(val > ReqHumid + 20){
        prog.parentNode.style.backgroundColor = blue;
    }
    else if(val >= ReqHumid){
        prog.parentNode.style.backgroundColor = green;
    }else {
        prog.parentNode.style.backgroundColor = orange;
        water();
    }
    prog.innerText = `${val/1.0}%`;
    prog.parentNode.style.width = `${val/1.0}%`;
    document.getElementById("soilvalue").innerText = val/1.0;
}

async function updateAir(val){
    var prog = document.getElementById("progressair");
    if(val < 100){
        prog.parentNode.style.width = `${val}%`;
    }else {
        prog.parentNode.style.width = `100%`;
    }
    if(val > 70){
        prog.parentNode.style.backgroundColor = blue;
    }
    else if(val >= 50){
        prog.parentNode.style.backgroundColor = green;
    }else {
        prog.parentNode.style.backgroundColor = orange;
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
    if(val > 33){
        prog.parentNode.style.backgroundColor = orange;
    }else if(val >= 20){
        prog.parentNode.style.backgroundColor = green;
    }else {
        prog.parentNode.style.backgroundColor = blue; 
    }
    prog.innerText = `${val} ํC`;
    document.getElementById("tempvalue").innerText = val;
}

//-------------------------------------SendData------------------------------------

async function setReqHumid(){
    document.getElementById('click').play();
    var x = document.getElementById("inputhumid").value;
    if (x < 0){
        x = 0;
        document.getElementById("inputhumid").value = x;
    }
    else if (x > 100){
        x = 100;
        document.getElementById("inputhumid").value = x;
    }
    else x = parseInt(x);
    ReqHumid = x;
    update(ref(db),{ReqHumid : x});
    alert(`Minumun Humidity satisfication is now ${x}%`);
}

async function watering(){
    document.getElementById('watering').play();
    water();
}
async function water(){
    if(waterok)return;
    waterok = 1;
    update(ref(db),{ReqWater : 1});
    setTimeout(function(){
        waterok = 0;
        update(ref(db),{ReqWater : 0});
        // setTimeout(function(){
        //     waterok = 0;
        //     var dataref = await ref(db);
        //     var data;
        //     get(dataref).then((snapshot) => {
        //         data = snapshot.val();
        //         if (snapshot.exists()) {
        //             if(data.ReqHumid > data.soilhumid){
        //                 water();
        //             }
        //         } else {
        //           console.log("No data available");
        //         }
        //     }).catch((error) => {
        //         console.error(error);
        //     });
        // }, 5000); 
    }, 5000); 
}

async function updateval(){
    var dataref = await ref(db);
    var data;
    get(dataref).then((snapshot) => {
        if (snapshot.exists()) {
            data = snapshot.val();
            console.log(data);
            updateSoil(data.soilhumid);
            updateAir(data.airhumid);
            updateTemp(data.temp);
            if(data.ReqHumid > data.soilhumid){
                water();
            }
        } else {
          console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
    setTimeout(function(){
        updateval();
    }, 1000); 
}

//-------------------------------------StartWebsite------------------------------------

async function startWebsite(){
    var dataref = await ref(db);
    var data;
    get(dataref).then((snapshot) => {
        if (snapshot.exists()) {
            data = snapshot.val();
            ReqHumid = data.ReqHumid;
            document.getElementById("inputhumid").value = ReqHumid;
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    // updateval();
    await onValue(dataref, (snapshot) => {
        data = snapshot.val();
        console.log(data);
        updateSoil(data.soilhumid);
        updateAir(data.airhumid);
        updateTemp(data.temp);
        if(data.ReqHumid > data.soilhumid){
            water();
        }
    });
}

window.setReqHumid = setReqHumid;
window.watering = watering;

startWebsite();