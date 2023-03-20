"use strict";

const { app,on, BrowserWindow,ipcRenderer,Menu  } = require('electron');
const btnOpen = document.getElementById("infoHow");
const btnLen = document.getElementById("changeLen");

const menu = document.getElementById("generalMenu");
const info = document.getElementById("appInfo");
const update = document.getElementById("nextInc");
const minimize = document.getElementById("min");
const miximize = document.getElementById("max");
const exit = document.getElementById("exit");

//MENU
const exitApp = () => {
    console.clear()
    console.log("work")
    app.quit();

}

//change lenguage
function changeLen(){
    const penLen = document.getElementById('spanLen');
    if(penLen.textContent === "EN"){
        penLen.innerHTML = "ES";
        //change();
    }else{
        penLen.innerHTML = "EN";
        //change();
    }
}

//exit.addEventListener('click',exitApp);
btnLen.addEventListener('click',changeLen);