const displayVar = document.querySelector(".display-content");
const buttons = document.querySelector("button");
const digitsBtns = document.querySelectorAll(".digits");
const operBtns = document.querySelectorAll(".operators");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const dotBtn = document.querySelector(".dot");
const bsBtn = document.querySelector(".bs");
const numsKey = "0123456789";
const opersKey = "+-*/%";
const dotKey = ".";
const equalKey = "Enter";
const bsKey = "Backspace";
const acKey = "Escape";

const keyButton = {
    "0": "zero",
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    [`${dotKey}`]: "dot",
    "+": "plus",
    "-": "minus",
    "*": "multiply",
    "/": "divide",
    "%": "modulo",
    [`${equalKey}`]: "equal",
    [`${bsKey}`]: "bs",
    [`${acKey}`]: "clear",
}

const operators = {
    "+": function(n1, n2) {
        return n1 + n2;
    },

    "-": function(n1, n2) {
        return n1 - n2;
    },

    "*": function(n1, n2) {
        return n1 * n2;
    },

    "/": function(n1, n2) {
        if (n2 === 0) return "ERROR";
        return n1 / n2;
    },

    "%": function(n1, n2) {
        return n1 % n2;
    }
};

function operate(operator, n1, n2) {
    return operator(n1, n2);
}

function calculate() {
    let firstNum = null;
    let secondNum = null;
    let oper = null;
    let resShown = false;
    let dotPressed = false;

    function enterDigit(num) {
        if (resShown) {
            displayVar.textContent = "";
            resShown = false;
        }
        displayVar.textContent += num;
    }

    function enterOper(op){
        let tempNum = parseFloat(displayVar.textContent);
        if (!isNaN(tempNum)) {
            if (firstNum !== null) {
                secondNum = tempNum;
                firstNum = operate(operators[oper], firstNum, secondNum);
                secondNum = null;
            }
            else {
                firstNum = tempNum;
            }
            oper = op;
            displayVar.textContent = "";
            dotPressed = false;
        }
        else if (oper) oper = op;
    }

    function enterEqual() {
        if (displayVar.textContent) {
            secondNum = parseFloat(displayVar.textContent);
            dotPressed = false;
        }

        if (firstNum !== null &&
                secondNum !== null &&
                oper !== null) {
            let res = operate(operators[oper], firstNum, secondNum);
            if (typeof res === "number"){
                if (res.toString().length > 11) {
                    displayVar.textContent = res.toString().slice(0, 11);
                }
                else displayVar.textContent = res.toString();
            }
            else {
                displayVar.textContent = res;
            }
            firstNum = null;
            secondNum = null;
            oper = null;
            resShown = true;
        }
    }

    function enterClear() {
        displayVar.textContent = "";
        firstNum = null;
        secondNum = null;
        oper = null;
        resShown = false;
    }

    function enterDot() {
        if (!dotPressed){
            displayVar.textContent += ".";
            dotPressed = true;
        }
    }

    function enterBs() {
        let oldContent = displayVar.textContent;
        displayVar.textContent = oldContent.slice(0, oldContent.length-1);
    }

    Array.from(digitsBtns).forEach((button) =>
    button.addEventListener('click', () => {
        let num = button.textContent;
        enterDigit(num);
    }));

    Array.from(operBtns).forEach((button) =>
        button.addEventListener('click', () => {
            oper = button.textContent;
            enterOper(oper);
        }));

    equalBtn.addEventListener('click', () => enterEqual());

    clearBtn.addEventListener('click', () => enterClear());

    dotBtn.addEventListener('click', () => enterDot());

    bsBtn.addEventListener('click', () => enterBs());

    document.addEventListener('keydown', (e) => {
        if (numsKey.includes(e.key)) enterDigit(e.key);
        else if (opersKey.includes(e.key)) enterOper(e.key);
        else if (e.key === equalKey) enterEqual();
        else if (e.key === acKey) enterClear();
        else if (e.key === dotKey) enterDot();
        else if (e.key === bsKey) enterBs();
        let targetBtn = document.querySelector(`.${keyButton[e.key]}`);
        if (targetBtn !== null) targetBtn.classList.add("pressed");
    });

    document.addEventListener('keyup', (e) => {
        let targetBtn = document.querySelector(`.${keyButton[e.key]}`);
        if(targetBtn !== null) targetBtn.classList.remove("pressed");
    });
}

calculate();
