
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
let operators = document.querySelectorAll(".operator");
let controls = document.querySelectorAll(".controls");
let screen = document.querySelector(".screen");
let decimalBtn = document.querySelector("#decimal");


let keypadBtns = document.querySelectorAll(".keypad button");

numbers.forEach(number => number.addEventListener("click", e => {
    if (lastState == "equals") init();
    if (screen.innerHTML.slice().replace(".", "").length < 12) {
        appendScreen(number.innerHTML);
        lastState = number.id;
    }
}));

operators.forEach(op => {
    op.addEventListener("click", () => {
        if (screenValid()) {
            if (firstOperand == null) firstOperand = screen.innerHTML, console.log("here");
            else if (secondOperand == null) secondOperand = screen.innerHTML, console.log("here2");
            else if (lastState == "equals") secondOperand = null, console.log("here3");
            else {
                console.log("here4")
                firstOperand = operate();
                secondOperand = null;
            }
        }
        clearScreen();
        operator = op.id;
        console.log([firstOperand, operator, secondOperand]);
        lastState = op.id;
    })
});

controls.forEach(control => {
    control.addEventListener("click", () => {
        switch (control.id) {
            case "c":
                init();
                break;
            
            case "equals":
                console.log(lastState);
                if (secondOperand == null && screenValid() && lastState != "equals") secondOperand = screen.innerHTML;
                if (secondOperand == null) operator = null;
                firstOperand = operate();
                screen.innerHTML = firstOperand;
                break;
            
            default:
                if (lastState == "equals") init();
                else clearScreen();
                break;
        }
        lastState = control.id;
    })
})

let audio = document.querySelector("#btnSound")
keypadBtns.forEach(btn => {
    // btn.addEventListener("click", () => audio.play());
});
// screen processing functions
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
function screenValid() {
    return screen.innerHTML != "";
}



function init() {
    firstOperand = null;
    secondOperand = null;
    operator = null;
    clearScreen();
}


function operate() {
    console.log([firstOperand, operator, secondOperand])
    if (secondOperand == null) return firstOperand;
    if (firstOperand == null) return secondOperand;
    let ans = null;
    switch (operator) {
        case "add":
            ans = add(firstOperand, secondOperand);
            break;
        case "subtract":
            ans = subtract(firstOperand, secondOperand);
            break;
        case "multiply":
            ans = multiply(firstOperand, secondOperand);
            break;
        case "divide":
            if (secondOperand == 0) {
                firstOperand = null;
                secondOperand = null;
                operator = null;
                return "undefined";
            }
            ans = divide(firstOperand, secondOperand);
            break;
        case "percent":
            ans =  percent(firstOperand, secondOperand);
            break;
        default:
            return (firstOperand == null ? secondOperand : firstOperand);
    }
    return limitDigits(ans);
}
function limitDigits(text) {
    if (String(text).replace('.', '').length > 12) {
        return text.toExponential(6);
    }
    return text;
}