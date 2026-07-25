
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

function percent(a, b) {
    return Number(a) / 100 * Number(b);
}

let firstOperand = null;
let secondOperand = null;
let operator = null;
let lastState = null;
let numbers = document.querySelectorAll(".number");
let screen = document.querySelector(".screen");
let decimalBtn = document.querySelector("#decimal");
numbers.forEach(number => number.addEventListener("click", e => {
    if (lastState == "equals") init();
    if (screen.innerHTML.slice().replace(".", "").length < 12) {
        appendScreen(number.innerHTML);
        lastState = number.id;
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

let operators = document.querySelectorAll(".operator");

operators.forEach(op => {
    op.addEventListener("click", () => {
        if (screen.innerHTML != "") firstOperand = screen.innerHTML;
        secondOperand = null;
        clearScreen();
        operator = op.id;
        lastState = op.id;
    })
});

let controls = document.querySelectorAll(".controls");
controls.forEach(control => {
    control.addEventListener("click", () => {
        lastState = control.id;
        switch (control.id) {
            case "c":
                init();
                break;
            
            case "equals":
                if (secondOperand == null) secondOperand = screen.innerHTML;
                clearScreen();
                let ans = operate(firstOperand, operator, secondOperand);
                if (ans == null) ans = "";
                firstOperand = ans;
                console.log([firstOperand, operator, secondOperand]);
                screen.innerHTML = ans;
                break;
            
            default:
                if (lastState == "equals") init();
                clearScreen();
                break;
        }
    })
})

function init() {
    firstOperand = null;
    secondOperand = null;
    operator = null;
    clearScreen();
}

function operate(firstOperand, operator, secondOperand) {
    if (secondOperand == null) return firstOperand;
    switch (operator) {
        case "add":
            return add(firstOperand, secondOperand);
        case "subtract":
            return subtract(firstOperand, secondOperand);
        case "multiply":
            return multiply(firstOperand, secondOperand);
        case "divide":
            return divide(firstOperand, secondOperand);
        case "percent":
            return percent(firstOperand, secondOperand);
        default:
            return null;
    }
}