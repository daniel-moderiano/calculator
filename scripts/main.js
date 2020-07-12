// TODO: handle decimal input 
// TODO: add symbols for multiply and divide with appropriate functionality
// TODO: handle overflow for user inputted values > length 20 ish


// Create object to store the various arithmetic functions to allow them to be easily called using the operate function (trial vs individually creating each function and then calling that, not sure if there is a difference)

const operatorFunctions = {
    "+" : function(a, b) {
        return a + b;
    },
    "-" : function(a, b) {
        return a - b;
    },
    '*' : function(a, b) {
        return a * b;
    },
    "/" : function(a, b) {
        return a / b;
    }
};

// Function operate that accepts 3 parameters: operator, and 2 operands. It then performs the arithmetic using the operands and the operator. 

function operate(operand, a, b) {
    if(operand === "/" && b === 0) {
        return "Cannot divide by zero";
    }
    return operatorFunctions[operand](a, b);
}

// Initialise/declare all relevant document variables

const numberString = "0123456789";
const operatorString = "+-/*"
const numButtons = document.querySelectorAll(".button--num");
const screenBottom = document.querySelector(".screen__content--bottom");
const screenTop = document.querySelector(".screen__content--top");
const clearBtn = document.querySelector(".button--clear");
const addBtn = document.querySelector(".button--add");
const equalsBtn = document.querySelector(".button--equals");
const operatorButtons = document.querySelectorAll(".button--operator");
const allButtons = document.querySelectorAll("button");
const backBtn = document.querySelector(".button--back");

let currentOperand;
let currentOperator;
let runningResult;
let equalsPressed = false;

screenBottom.textContent = "0";

// Function to return text size to normal after any kind of shift, and adjust text size for high or low long numbers

function resetTextSize() {
    screenBottom.classList.remove("screen__content--shrink");
    screenBottom.classList.remove("screen__content--extra-shrink");
}

function overflowHandling() {
    if(screenBottom.textContent.length >= 12) {
        screenBottom.classList.add("screen__content--shrink");
        if(screenBottom.textContent.length > 20) {
            screenBottom.classList.add("screen__content--extra-shrink");
        }
    }
}

// Add event listener to numbered buttons to update screen with textContent equal to the button value

numButtons.forEach(function(btn) {
    btn.addEventListener("click", () => {
        // equalsPressed = false;
        if(screenBottom.textContent === "0" || currentOperand === undefined) {
            screenBottom.textContent = btn.textContent;
        } else if(equalsPressed === true) {
            currentOperator = undefined;
            currentOperand = undefined;
            screenTop.textContent = ""
            screenBottom.textContent = btn.textContent;
        } else {
            screenBottom.textContent += btn.textContent; 
        }
        currentOperand = parseInt(screenBottom.textContent);
        equalsPressed = false;
    });
});

// Reset screen content to zero (initial state) on click of "C" button

clearBtn.addEventListener("click", () => {
    resetTextSize();
    screenBottom.textContent = "0";
    screenTop.textContent = ""
    currentOperator = undefined;
    currentOperand = undefined;
    runningResult = undefined;
    equalsPressed = false;
    resetTextSize();
});

// On click of an operator +, -, *, /, store the current screen content as the current operand variable, and store the selected operator as the current operator variable. Display operand and operator in dim grey screen top

operatorButtons.forEach(function(btn) {
    btn.addEventListener("click", () => {
        if(currentOperand === undefined && currentOperator === undefined) {
            currentOperand = 0;
            operatorClick(btn);
        } else if(currentOperand === undefined) {
            // pass
        } else {
            operatorClick(btn);
            equalsPressed = false; 
        }     
    });
});


function operatorClick(btn) {
    if(equalsPressed === true) {
        currentOperand = undefined;
        currentOperator = btn.textContent;
        screenTop.textContent = `${runningResult} ${currentOperator} `
    } else {
        // If this is the first operator then start the runningResult, else simply compute the updated runningResult and update screen displays accordingly. 
        if(runningResult === undefined) {
            runningResult = parseInt(screenBottom.textContent);
        } else {
            runningResult = operate(currentOperator, runningResult, currentOperand);
            screenBottom.textContent = runningResult;
        }
        currentOperator = btn.textContent;
        screenTop.textContent += `${currentOperand} ${currentOperator} `;
        currentOperand = undefined;
    }
}

// Equals function

function equals() {
    if(currentOperand === undefined && currentOperator === undefined) {
        currentOperand = 0;
        runningResult = parseInt(screenBottom.textContent)
        screenTop.textContent = `${currentOperand} = `
    } else if(currentOperator === undefined) {
        screenTop.textContent = `${currentOperand} = `;
        runningResult = parseInt(screenBottom.textContent)
    } else if(currentOperand === undefined) {
        currentOperand = parseInt(screenBottom.textContent);
        runningResult = operate(currentOperator, runningResult, currentOperand);
        screenBottom.textContent = runningResult;
        screenTop.textContent = `${currentOperand} ${currentOperator} ${currentOperand} = `;   
    } else {
        if(equalsPressed === false) {
            screenTop.textContent += `${currentOperand} = `;
            runningResult = operate(currentOperator, runningResult, currentOperand);
            screenBottom.textContent = runningResult;
       
        } else {
            screenTop.textContent = `${runningResult} ${currentOperator} ${currentOperand} = `;
            runningResult = operate(currentOperator, runningResult, currentOperand);
            screenBottom.textContent = runningResult;
        }   
    }    
    equalsPressed = true; 
}

equalsBtn.addEventListener("click", equals);

// General function to address large numbers

allButtons.forEach(function(btn) {
    btn.addEventListener("click", overflowHandling);
});

// Event listener for back key to remove last digit of currentOperand. Should have no function where there is no current operand, or when equalsPressed = true. 

function backspace() {
    if(equalsPressed === false && currentOperand != undefined) {
        if(((currentOperand).toString().length > 1) && ((currentOperand).toString().length <12)) {
            currentOperand = parseInt((currentOperand.toString().slice(0, -1)));
            resetTextSize();
        } else if(((currentOperand).toString().length > 1)) {
            currentOperand = parseInt((currentOperand.toString().slice(0, -1)));
        } else {
            currentOperand = 0;
        }
        screenBottom.textContent = currentOperand;  
    }
}

backBtn.addEventListener("click", backspace);


// Keyboard functionality

function keyNumButton(key) {
    if(screenBottom.textContent === "0" || currentOperand === undefined) {
        screenBottom.textContent = key;
    } else if(equalsPressed === true) {
        currentOperator = undefined;
        currentOperand = undefined;
        screenTop.textContent = ""
        screenBottom.textContent = key;
    } else {
        screenBottom.textContent += key; 
    }
    currentOperand = parseInt(screenBottom.textContent);
    equalsPressed = false;
}
    

function operatorKeyClick(key) {
    if(equalsPressed === true) {
        currentOperand = undefined;
        currentOperator = key;
        screenTop.textContent = `${runningResult} ${currentOperator} `
    } else {
        // If this is the first operator then start the runningResult, else simply compute the updated runningResult and update screen displays accordingly. 
        if(runningResult === undefined) {
            runningResult = parseInt(screenBottom.textContent);
        } else {
            runningResult = operate(currentOperator, runningResult, currentOperand);
            screenBottom.textContent = runningResult;
        }
        currentOperator = key;
        screenTop.textContent += `${currentOperand} ${currentOperator} `;
        currentOperand = undefined;
    }
}


// Operator and number button functions must be altered slightly for keypress, though could be made compatible with the use of "this" keyword?


document.addEventListener("keydown", function(event) {
    if(numberString.includes(event.key)) {
        keyNumButton(event.key);
    } else if(operatorString.includes(event.key)) {
        if(currentOperand === undefined && currentOperator === undefined) {
            currentOperand = 0;
            operatorKeyClick(event.key);
        } else if(currentOperand === undefined) {
            // pass
        } else {
            operatorKeyClick(event.key);
            equalsPressed = false; 
        }     
    } else if(event.key === "=" || event.key === "Enter") {
        equals();
    } else if(event.key === "Backspace") {
        backspace();
    } else {
        // pass
    }
    overflowHandling();
});