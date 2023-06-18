"use strict";

// Defining "power" variable to check some conditions.
let power = false;

// Defining "add" function to show clicked buttons results on calculator display.
function add(val){        
    document.getElementById("display").value += val.target.value;
    // If "power" value is true ('^' button has been clicked) we perform following operation.
    if(power) {
        let powNumbers = document.getElementById("display").value.split('^');
        // Check if user didn't enter any number first, and asked for exponentiation operation.
        if(powNumbers[0] == "") {
            alert("You have to add a number first before you want to perform exponentiation operation!");
            document.getElementById("display").value = '';
            power = false;
        } else {
            // Check if both entered values (first and second numbers) are actually numbers and valid (true) for exponentiation operation!
            if(Number(powNumbers[0]) && Number(powNumbers[1])) {
                document.getElementById("display").value = powNumbers[0] ** powNumbers[1];
                power = false;
            } else {
                power = false;
                document.getElementById("display").value = '';
                alert("Invalid input!");   
            }
        }
    }
}

// By defining this function we'll complete most of our calculations here which happens when user click on "=" button.
function calculation() {
        // Check if user didn't ask for calculation when display value was empty.
        if(eval(document.getElementById("display").value)) {
            document.getElementById("display").value = eval(document.getElementById("display").value);
        } else {
            // Handling "undefined" error output on calculator display somehow!
            document.getElementById("display").value = 0; 
        }
}

// Defining clear or reset functionality button in order to make calculators display empty.
function reset() {
    document.getElementById("display").value = '';
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
    } else{
        let val = document.getElementById("display").value;
        // Check if user is asking for mathematical result when nothing is entered yet, and calculators result display is empty!
        if(Math[mathFunc](val) == "") {
            document.getElementById("display").value = 0; 
        } else {
            // Check if user asked for wrong mathematical operations or pressing irrelevant buttons Continuously.
            if(Math[mathFunc](val)){
                document.getElementById("display").value = Math[mathFunc](val);
            } else {
                document.getElementById("display").value = '';
                // Handling "NaN" error output on calculators display somehow!
                alert("Invalid input!");
            }            
        }
    }
}
