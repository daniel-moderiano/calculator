// Create object to store the various arithmetic functions to allow them to be easily called using the operate function (trial vs individually creating each function and then calling that, not sure if there is a difference)

const operatorFunctions = {
    "+" : function(a, b) {
        return a + b;
    },
    "-" : function(a, b) {
        return a - b;
    },
    '×' : function(a, b) {
        return a * b;
    },
    "÷" : function(a, b) {
        return a / b;
    }
};

// Function operate that accepts 3 parameters: operator, and 2 operands. It then performs the arithmetic using the operands and the operator. 

function operate(operand, a, b) {
    if(operand === "÷" && b === 0) {
        return "Cannot divide by zero";
    }
    return operatorFunctions[operand](a, b);
}

// Initialise/declare all relevant document variables

const numberString = "0123456789.";
const operatorString = "+-÷×*/"
const numButtons = document.querySelectorAll(".button--num");
const screenBottom = document.querySelector(".screen__content--bottom");
const screenTop = document.querySelector(".screen__content--top");
const clearBtn = document.querySelector(".button--clear");
const equalsBtn = document.querySelector(".button--equals");
const operatorButtons = document.querySelectorAll(".button--operator");
const allButtons = document.querySelectorAll("button");
const backBtn = document.querySelector(".button--back");
const addIcon = document.querySelector(".button__icon--add")

let currentOperand;
let currentOperator;
let runningResult;
let equalsPressed = false;
let displayOverflow = false;

screenBottom.textContent = "0";

// Object that connects keys to their coument objects for class toggles

const keyMap = {
    "0": document.querySelector(".button--zero"),
    "1": document.querySelector(".button--one"),
    "2": document.querySelector(".button--two"),
    "3": document.querySelector(".button--three"),
    "4": document.querySelector(".button--four"),
    "5": document.querySelector(".button--five"),
    "6": document.querySelector(".button--six"),
    "7": document.querySelector(".button--seven"),
    "8": document.querySelector(".button--eight"),
    "9": document.querySelector(".button--nine"),
    ".": document.querySelector(".button--decimal"),
    "=": document.querySelector(".button--equals"),
    "+": document.querySelector(".button--add"),
    "-": document.querySelector(".button--subtract"),
    "*": document.querySelector(".button--multiply"),
    "/": document.querySelector(".button--divide"),
    "Backspace": document.querySelector(".button--back"),
    "Enter": document.querySelector(".button--equals")
};

// Function to return text size to normal after any kind of shift, and adjust text size for high or low long numbers

function resetTextSize() {
    screenBottom.classList.remove("screen__content--shrink");
    screenBottom.classList.remove("screen__content--extra-shrink");
}

function overflowHandling() {
    // The following lengths may need changing once finaly styling is done.
    if(screenBottom.textContent.length >= 12) {
        screenBottom.classList.add("screen__content--shrink");
        if(screenBottom.textContent.length > 20) {
            screenBottom.classList.add("screen__content--extra-shrink");
        }
    }
    // 148 characters accounts for 3 lines of screen top display, this may need to change once final styling is done.
    if(screenTop.textContent.length > 148 || displayOverflow === true) {
        screenTop.textContent = "Display overflow";
        displayOverflow = true;
    }
}

// Add event listener to numbered buttons to update screen with textContent equal to the button value

numButtons.forEach(function(btn) {
    btn.addEventListener("mousedown", () => {
        if(screenBottom.textContent.length > 20 && currentOperand != undefined) {
            // pass
        } else {
            if(btn.textContent === "." && screenBottom.textContent.includes(".") && currentOperand != undefined) {
                // pass
            } else {
                if(screenBottom.textContent === "0" || currentOperand === undefined) {
                    if(btn.textContent === ".") {
                        screenBottom.textContent = `0${btn.textContent}`;
                    } else {
                        screenBottom.textContent = btn.textContent;
                    }
                } else if(equalsPressed === true) {
                    if(btn.textContent === ".") {
                        screenBottom.textContent = `0${btn.textContent}`;
                    } else {
                        screenBottom.textContent = btn.textContent;
                    }
                    currentOperator = undefined;
                    currentOperand = undefined;
                    screenTop.textContent = ""
                } else {
                    screenBottom.textContent += btn.textContent; 
                }
                currentOperand = parseFloat(screenBottom.textContent);
                equalsPressed = false;
            }  
        } 
    });
});

// Reset screen content to zero (initial state) on click of "C" button

clearBtn.addEventListener("mousedown", () => {
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
    btn.addEventListener("mousedown", () => {
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
        screenTop.textContent = `${runningResult} ${currentOperator} `;
    } else {
        // If this is the first operator then start the runningResult, else simply compute the updated runningResult and update screen displays accordingly. 
        if(runningResult === undefined) {
            runningResult = parseFloat(screenBottom.textContent);
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
    displayOverflow = false;
    if(currentOperand === undefined && currentOperator === undefined) {
        currentOperand = 0;
        runningResult = parseFloat(screenBottom.textContent);
        screenTop.textContent = `${currentOperand} = `
    } else if(currentOperator === undefined) {
        screenTop.textContent = `${currentOperand} = `;
        runningResult = parseFloat(screenBottom.textContent);
    } else if(currentOperand === undefined) {
        currentOperand = parseFloat(screenBottom.textContent);
        runningResult = operate(currentOperator, runningResult, currentOperand);
        screenBottom.textContent = runningResult;
        screenTop.textContent = `${currentOperand} ${currentOperator} ${currentOperand} = `;   
    } else {
        if(equalsPressed === false) {
            screenTop.textContent += `${currentOperand} = `;
            runningResult = (operate(currentOperator, runningResult, currentOperand));
            screenBottom.textContent = runningResult;
       
        } else {
            screenTop.textContent = `${runningResult} ${currentOperator} ${currentOperand} = `;
            runningResult = (operate(currentOperator, runningResult, currentOperand));
            screenBottom.textContent = runningResult;
        }   
    }    
    equalsPressed = true; 
}

equalsBtn.addEventListener("mousedown", equals);

// General function to address large numbers

allButtons.forEach(function(btn) {
    btn.addEventListener("mousedown", overflowHandling);
});



// Event listener for back key to remove last digit of currentOperand. Should have no function where there is no current operand, or when equalsPressed = true. 

function backspace() {
    if(equalsPressed === false && currentOperand != undefined) {
        if(((currentOperand).toString().length > 1) && ((currentOperand).toString().length <12)) {
            currentOperand = parseFloat((currentOperand.toString().slice(0, -1)));
            resetTextSize();
        } else if(((currentOperand).toString().length > 1)) {
            currentOperand = parseFloat((currentOperand.toString().slice(0, -1)));
        } else {
            currentOperand = 0;
        }
        screenBottom.textContent = currentOperand;  
    }
}

backBtn.addEventListener("mousedown", backspace);


// Keyboard functionality

function keyNumButton(key) {
    if(screenBottom.textContent.length > 20 && currentOperand != undefined) {
        // pass
    } else {
        if(key === "." && screenBottom.textContent.includes(".") && currentOperand != undefined) {
            // pass
        } else {
            if(screenBottom.textContent === "0" || currentOperand === undefined) {
                if(key === ".") {
                    screenBottom.textContent = `0${key}`;
                } else {
                    screenBottom.textContent = key;
                }
            } else if(equalsPressed === true) {
                if(key === ".") {
                    screenBottom.textContent = `0${key}`;
                } else {
                    screenBottom.textContent = key;
                }
                currentOperator = undefined;
                currentOperand = undefined;
                screenTop.textContent = ""
            } else {
                screenBottom.textContent += key; 
            }
            currentOperand = parseFloat(screenBottom.textContent);
            equalsPressed = false;
        }  
    } 
}
    
function operatorKeyClick(key) {
    if(equalsPressed === true) {
        currentOperand = undefined;
        if(key === "/") {
            currentOperator = "÷";
        } else if(key === "*") {
            currentOperator = "×";
        } else {
            currentOperator = key;
        }
        screenTop.textContent = `${runningResult} ${currentOperator} `
    } else {
        // If this is the first operator then start the runningResult, else simply compute the updated runningResult and update screen displays accordingly. 
        if(runningResult === undefined) {
            runningResult = parseFloat(screenBottom.textContent);
        } else {
            runningResult = parseFloat(operate(currentOperator, runningResult, currentOperand));
            screenBottom.textContent = runningResult;
        }
        if(key === "/") {
            currentOperator = "÷";
        } else if(key === "*") {
            currentOperator = "×";
        } else {
            currentOperator = key;
        }
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
    }   
    if((event.key === "=" || event.key === "Enter")) {
        equals();
    } else if(event.key === "Backspace") {
        backspace();
    } else {
        // pass
    }
    overflowHandling();
});

function keyClassToggle(key) {
    let targetKey = keyMap[key];
    if(numberString.includes(key)) {
        targetKey.classList.toggle("active-numKey");
    } else if(operatorString.includes(key) || key === "Backspace") {
        targetKey.classList.toggle("active-operatorKey");
    } else if(key === "=" || key === "Enter") {
        targetKey.classList.toggle("active-equalsKey");
    } 
}



document.addEventListener('keydown', function(event) {
    keyClassToggle(event.key);
});

document.addEventListener('keyup', function(event) {
    keyClassToggle(event.key);
});