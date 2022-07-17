const display = document.querySelector(".display");
const digitsBtns = document.querySelectorAll(".digits");
const operBtns = document.querySelectorAll(".operators");
const equalBtn = document.querySelector(".equal");

var operators = {
    "Add": function(n1, n2){
    return n1 + n2;
    },

    "Subtract": function(n1, n2){
    return n1 - n2;
    },

    "Multiply": function(n1, n2){
    return n1 * n2;
    },

    "Divide": function(n1, n2){
    return n1 / n2;
    }
};

function operate(operator, n1, n2){
    return operator(n1, n2);
}

function fillDisplay(){
    Array.from(digitsBtns).forEach((button) =>
        button.addEventListener('click', () => {
            const num = button.textContent;
            console.log(num);
            display.textContent += num;
        }));
}

function calculate(){
    let firstNum = null;
    let secondNum = null;
    let oper;

    fillDisplay();

    Array.from(operBtns).forEach((button) =>
        button.addEventListener('click', () => {
            let tempNum = parseInt(display.textContent);
            if (firstNum !== null) {
                secondNum = tempNum;
                firstNum = operate(operators[oper], firstNum, secondNum);
                secondNum = null;
            }
            else {
                firstNum = tempNum;
            }
            oper = button.textContent;
            display.textContent = "";
        }));

    equalBtn.addEventListener('click', () => {
        secondNum = parseInt(display.textContent);
        let res = operate(operators[oper], firstNum, secondNum);
        display.textContent = res;
        console.log("res", res);
        firstNum = null;
        secondNum = null;
        display.textContent = "";
    })
}

calculate();
