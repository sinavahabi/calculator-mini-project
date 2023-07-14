/*
    Program: Web Application Calculator
    Author: sina vahabi
    Copyright: 2023/06
*/

"use strict";

// Defining "power" variable to check some conditions.
let power = false;

// Accessing to DOM objects.
const btnElemList = document.querySelectorAll(".buttons");
const inputElemList = document.getElementsByTagName("input");

// Using loops to modify style properties values of button elements when they get focused in.
for (let input=0; input < inputElemList.length; input++) {
    inputElemList[input].addEventListener("focusin", () => {
        inputElemList[input].style.opacity = ".6";
    });
}

// Using loops to modify style properties values of button elements when they get focused out.
for (let input=0; input < inputElemList.length; input++) {
    inputElemList[input].addEventListener("focusout", () => {
        inputElemList[input].style.opacity = "1";
    });
}

// Defining "add" function to show clicked buttons results on calculator display.
function add(val) {        
    document.getElementById("display").value += val.target.value;
    // If "power" value is true ('^' button has been clicked) we perform following operation.
    if (power) {
        let powNumbers = document.getElementById("display").value.split('^');
        // Check if user didn't enter any number first, and asked for exponentiation operation.
        if (powNumbers[0] == "") {
            // If user wrong actions are detected, following modifications will occur and user will face some changes on the calculator appearance and button actions.
            for (let btn=0; btn < btnElemList.length; btn++) {
                btnElemList[btn].disabled = true;
                btnElemList[btn].style.cursor = "not-allowed";
                btnElemList[btn].style.opacity = ".5";
            }
            document.getElementById("display").value = 'Invalid Input!';
            power = false;
        } else {
            // Check if both entered values (first and second numbers) are actually numbers and valid (true) for exponentiation operation!
            if (Number(powNumbers[0]) && Number(powNumbers[1])) {
                document.getElementById("display").value = powNumbers[0] ** powNumbers[1];
                power = false;
            } else {
                // If user wrong actions are detected, following modifications will occur and user will face some changes on the calculator appearance and button actions.
                power = false;
                for (let btn=0; btn < btnElemList.length; btn++) {
                    btnElemList[btn].disabled = true;
                    btnElemList[btn].style.cursor = "not-allowed";
                    btnElemList[btn].style.opacity = ".5";
                } 
                document.getElementById("display").value = 'Invalid Input!';
            }
        }
    }
}

// By defining this function we'll complete most of our calculations here which happens when user click on "=" button.
function calculation() {
        // Check if user didn't ask for weird and invalid calculation.
        try {
            // Check if user didn't ask for calculation when display value was empty.
            if (eval(document.getElementById("display").value)) {
                document.getElementById("display").value = eval(document.getElementById("display").value);
            } else {
                // Handling "undefined" error output on calculator display somehow!
                document.getElementById("display").value = "0"; 
            }
        }
        // Handling errors by "try catch(e)" conditions!
        catch(err) {
            // If user wrong actions are detected, following modifications will occur and user will face some changes on the calculator appearance and button actions.
            for (let btn=0; btn < btnElemList.length; btn++) {
                btnElemList[btn].disabled = true;
                btnElemList[btn].style.cursor = "not-allowed";
                btnElemList[btn].style.opacity = ".5";
            }
            document.getElementById("display").value = "Invalid Input!";
        }    
}

// Defining clear or reset functionality button in order to make calculators display empty.
function reset() {
    document.getElementById("display").value = '';
    for (let btn=0; btn < btnElemList.length; btn++) {
        btnElemList[btn].disabled = false;
        btnElemList[btn].style.cursor = "pointer";
        btnElemList[btn].style.opacity = "1";
    }
}

// Defining backspace or delete functionality button in order to minus last displayed result number one by one for each press at a time. 
function backspace() {
    document.getElementById("display").value = document.getElementById("display").value.replace(/.$/, '');
}

// This function will handle the other mathematical operations which "eval()" function couldn't.
function mathCalculation(mathFunc) {
    // Here we check if '^' button has been clicked.
    if (mathFunc == 'pow') {
        power = true;
        document.getElementById("display").value += '^';
    } else {
        let val = document.getElementById("display").value;
        // Check if user is asking for mathematical result when nothing is entered yet, and calculators result display is empty!
        if (Math[mathFunc](val) == "") {
            document.getElementById("display").value = 0; 
        } else {
            // Check if user asked for wrong mathematical operations or pressing irrelevant buttons Continuously.
            if (Math[mathFunc](val)){
                document.getElementById("display").value = Math[mathFunc](val);
            } else {
                // Handling "NaN" output result on calculators display somehow!
                document.getElementById("display").value = 'Invalid Input!';
                // If user wrong actions are detected, following modifications will occur and user will face some changes on the calculator appearance and button actions.
                for (let btn=0; btn < btnElemList.length; btn++) {
                    btnElemList[btn].disabled = true;
                    btnElemList[btn].style.cursor = "not-allowed";
                    btnElemList[btn].style.opacity = ".5";
                }
            }            
        }
    }
}

// Adding digital clock feature to program.
function clock() {
    // Getting current live date, hour, minute and etc.
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let time = "AM";
    let dateString = String(date);

    // Using conditions to show different appearance.
    if (hour > 12) {
        hour -= 12;
        time = "PM";
    }

    if (hour < 10) {
        hour = "0" + hour;
    }

    if (minute < 10) {
        minute = "0" + minute;
    }

    if (second < 10) {
        second = "0" + second;
    }

    // DOM searching.
    let timeDisplay = `${hour}:${minute}:${second} ${time}`;
    let dateDisplay = dateString.slice(0,15);
    document.getElementById("clock").textContent = timeDisplay;
    document.getElementById("date").textContent = dateDisplay;

    // Creating nested setTimeout.
    setTimeout(clock, 1000);
}

clock();
