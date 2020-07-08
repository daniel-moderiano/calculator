// TODO: handle the pressing of equals after inputting a + b = (currently produces a + b = b = b = etc)
// TODO: handle the overflow of recurring decimals
// TODO: handle the keyboard input
// TODO: Add backspace functionality
// TODO: add decimal/float support in arithmetic


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
    if(operand === "/" && b === 0) {
        return "Cannot divide by zero";
    }
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
let runningResult;;
let result;
let equalsPressed = false;

screenBottom.textContent = "0";

// Function to reset text size for all inputs in case the user decides to divide by zero

function resetTextSize() {
    screenBottom.classList.remove("screen__content--shrink");
}


// Add event listener to numbered buttons to update screen with textContent equal to the button value

numButtons.forEach(function(btn) {
    btn.addEventListener("click", () => {
        resetTextSize();
        if(screenBottom.textContent === "0" || currentOperand === undefined) {
            screenBottom.textContent = btn.textContent;
        } else if(result != undefined) {
            currentOperator = undefined;
            currentOperand = undefined;
            runningResult = undefined;
            result = undefined;
            screenTop.textContent = ""
            screenBottom.textContent = btn.textContent;
        } else {
            screenBottom.textContent += btn.textContent; 
        }
        currentOperand = parseInt(screenBottom.textContent);
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
    result = undefined;
});



// On click of an operator (+, -, x, /), store the current screen content as the current operand variable, and store the selected operator as the current operator variable. In addition, add the current operator and operand to the ongoing array of stored operands and operators for later function use. Display operand and operator in dim grey screen top

operatorButtons.forEach(function(btn) {
    btn.addEventListener("click", () => {
        resetTextSize();
        if(result != undefined) {
            currentOperand = result;
            currentOperator = btn.textContent;
            screenTop.textContent = `${currentOperand} ${currentOperator} `;
            runningResult = result;
            result = undefined;
            currentOperand = undefined;

        } else {
            operatorClick(btn);    
        }
           
    });
});


function operatorClick(btn) {
    if(runningResult === undefined) {
        runningResult = parseInt(screenBottom.textContent);
    } else {
        runningResult = operate(currentOperator, runningResult, currentOperand);
        if(runningResult === "Cannot divide by zero") {
            screenBottom.classList.add("screen__content--shrink");
            screenBottom.textContent = runningResult;
        } else {
            screenBottom.textContent = runningResult;
        }
    }
    currentOperator = btn.textContent
    screenTop.textContent += `${currentOperand} ${currentOperator} `;
    currentOperand = undefined;
}

// addBtn.addEventListener("click", addition);

// Make sure to store the on-screen operand in the storedOperands array prior to evaluation of arithmetic (note this is a tentative implementation, and in fact we could avoid adding this to stored and simply utilise the currentOperand variable).


function equals() {
    if(currentOperand === undefined && currentOperator === undefined) {
        result = 0;
    } else if(currentOperator === undefined && currentOperand != undefined) {
        result = currentOperand;
        screenTop.textContent = `${currentOperand} = `;
    // } else if(currentOperand === undefined) {
    //     currentOperand = screenBottom.textContent;
    //     result = operate(currentOperator, runningResult, currentOperand);
    //     screenTop.textContent += `${currentOperand} = `;
    } else if(currentOperand === undefined && currentOperator != undefined) {
        result = operate(currentOperator, runningResult, parseInt(screenBottom.textContent));
        screenTop.textContent = `${result - runningResult} ${currentOperator} ${runningResult} = `;
    
    // } else if(currentOperand === undefined) {
    //     currentOperand = screenBottom.textContent;
    //     result = operate(currentOperator, runningResult, currentOperand);
    //     screenTop.textContent += `${currentOperand} = `;
    } else {
        result = operate(currentOperator, runningResult, currentOperand);
        screenTop.textContent += `${currentOperand} = `;
    }

    if(result === "Cannot divide by zero") {
        screenBottom.classList.add("screen__content--shrink");
        screenBottom.textContent = result;
    } else {
        screenBottom.textContent = result;
    }

    equalsPressed = true;
    
    // currentOperand = undefined;
    // currentOperator = undefined;
}

equalsBtn.addEventListener("click", equals);


