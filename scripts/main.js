
// Create object to store the various arithmetic functions to allow them to be easily called using the operate function (trial vs individually creating each function and then calling that, not sure if there is a difference)

const operatorFunctions = {
    add : function(a, b) {
        return a + b;
    },
    subtract : function(a, b) {
        return a - b;
    },
    multiply : function(a, b) {
        return a * b;
    },
    divide : function(a, b) {
        return a / b;
    }
};

// Function operate that accepts 3 parameters: operator, and 2 operands. It then performs the arithmetic using the operands and the operator. 

function operate(operand, a, b) {
    return operatorFunctions[operand](a, b);
}

// Add event listener to numbered buttons to update screen with textContent equal to the button value

const numButtons = document.querySelectorAll(".button--num");
const screenBottom = document.querySelector(".screen__content--bottom");
const eightBtn = document.querySelector(".button--eight");

numButtons.forEach(function(btn) {
    btn.addEventListener("click", () => {
        screenBottom.textContent = btn.textContent;       
    });
});


