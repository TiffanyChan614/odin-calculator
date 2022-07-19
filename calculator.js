const display = document.querySelector(".display");
const digitsBtns = document.querySelectorAll(".digits");
const operBtns = document.querySelectorAll(".operators");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");

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

function calculate(){
    let firstNum = null;
    let secondNum = null;
    let oper = null;
    let resShown = false;

    Array.from(digitsBtns).forEach((button) =>
    button.addEventListener('click', () => {
        console.log(resShown);
        if (resShown) {
            display.textContent = "";
            resShown = false;
        }
        const num = button.textContent;
        display.textContent += num;
    }));

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
            console.log("firstNum", firstNum);
            console.log("secondNum", secondNum);
        }));

    equalBtn.addEventListener('click', () => {
        if (display.textContent){
            secondNum = parseInt(display.textContent);
        }
        if (firstNum !== null &&
                secondNum !== null &&
                oper !== null){
            let res = operate(operators[oper], firstNum, secondNum);
            display.textContent = res.toFixed(8);
            console.log("res", res);
            firstNum = null;
            secondNum = null;
            oper = null;
            resShown = true;
        }
    })

    clearBtn.addEventListener('click', () => {
        display.textContent = "";
        firstNum = null;
        secondNum = null;
        oper = null;
        resShown = false;
    })
}

calculate();
