
// Create object to store the various arithmetic functions to allow them to be easily called using the operate function (trial vs individually creating each function and then calling that, not sure if there is a difference)

const operatorFunctions = {
    "+" : function(a, b) {
        return a + b;
    },
    "-" : function(a, b) {
        return a - b;
    },
    'x' : function(a, b) {
        return a * b;
    },
    "/" : function(a, b) {
        return a / b;
    }
};

// Function operate that accepts 3 parameters: operator, and 2 operands. It then performs the arithmetic using the operands and the operator. 

function operate(operand, a, b) {
    return operatorFunctions[operand](a, b);
}

// Initialise/declare all relevant document variables

const numberString = "0123456789";
const operatorString = "+-/x"
const numButtons = document.querySelectorAll(".button--num");
const screenBottom = document.querySelector(".screen__content--bottom");
const screenTop = document.querySelector(".screen__content--top");
const clearBtn = document.querySelector(".button--clear");
const addBtn = document.querySelector(".button--add");
const equalsBtn = document.querySelector(".button--equals");
const operatorButtons = document.querySelectorAll(".button--operator");

let currentOperand;
let currentOperator;
let runningResult;
let equalsPressed = false;

screenBottom.textContent = "0";



// Add event listener to numbered buttons to update screen with textContent equal to the button value

numButtons.forEach(function(btn) {
    btn.addEventListener("click", () => {
        if(screenBottom.textContent === "0" || currentOperand === undefined) {
            screenBottom.textContent = btn.textContent;
        } else {
            screenBottom.textContent += btn.textContent; 
        }
        currentOperand = parseInt(screenBottom.textContent);
    });
});

// Reset screen content to zero (initial state) on click of "C" button

clearBtn.addEventListener("click", () => {
    screenBottom.textContent = "0";
    screenTop.textContent = ""
    currentOperator = undefined;
    currentOperand = undefined;
    runningResult = undefined;
});

// On click of an operator (+, -, x, /), store the current screen content as the current operand variable, and store the selected operator as the current operator variable. In addition, add the current operator and operand to the ongoing array of stored operands and operators for later function use. Display operand and operator in dim grey screen top

operatorButtons.forEach(function(btn) {
    btn.addEventListener("click", () => {
        operatorClick(btn);       
    });
});


function operatorClick(btn) {
    if(runningResult === undefined) {
        runningResult = parseInt(screenBottom.textContent);
    } else {
        runningResult = operate(currentOperator, runningResult, currentOperand);
        screenBottom.textContent = runningResult;
    }
    currentOperator = btn.textContent
    screenTop.textContent += `${currentOperand} ${currentOperator} `;
    currentOperand = undefined;
}

// addBtn.addEventListener("click", addition);

// Make sure to store the on-screen operand in the storedOperands array prior to evaluation of arithmetic (note this is a tentative implementation, and in fact we could avoid adding this to stored and simply utilise the currentOperand variable).

function equals() {
    screenTop.textContent += `${currentOperand} = `;
    runningResult = operate(currentOperator, runningResult, currentOperand);
    screenBottom.textContent = runningResult;
    equalsPressed = true;
}

equalsBtn.addEventListener("click", equals);

// On second equals press, calculate newResult = operate(currentOperator, RunningResult, current operand)

