
function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
}

let firstOperand;
let secondOperand;
let operator;
let numbers = document.querySelectorAll(".number");
let screen = document.querySelector(".screen");
let decimalBtn = document.querySelector("#decimal");
numbers.forEach(number => number.addEventListener("click", e => {
    if (screen.innerHTML.slice().replace(".", "").length < 12) {
        appendScreen(number.innerHTML);
    }
}));

function appendScreen(text) {
    screen.innerHTML = removeLeadingZeros(screen.innerHTML + text);
    checkDecimal();
    return;
}
function checkDecimal() {
    if (screen.innerHTML.includes(".")) {
        decimalBtn.disabled = true;
    }
}
function clearScreen() {
    screen.innerHTML = "";
    decimalBtn.disabled = false;
}
function removeLeadingZeros(text) {
    text = text.replace(/^0+/, '0');
    if (text.length > 1 && text[1] != '.' && text[0] == '0') return text.slice(1);
    return text;
}
let controls = document.querySelectorAll(".controls");
controls.forEach(control => {
    control.addEventListener("click", () => {
        switch (control.id) {
            case "c":
                firstOperand = undefined;
                secondOperand = undefined;
                operator = undefined;
                break;
            
            case "equals":
                secondOperand = screen.innerHTML;
                operate(firstOperand, operator, secondOperand);
                break;
            
        
            default:
                break;
        }
        clearScreen(); 
    })
})

function operate(firstOperand, operator, secondOperand) {
    switch (operator) {
        case "+":
            return add(firstOperand, secondOperand);
        case "-":
            return subtract(firstOperand, secondOperand);
        case "*":
            return multiply(firstOperand, secondOperand);
        case "/":
            return divide(firstOperand, secondOperand);
        default:
            return null;
    }
}