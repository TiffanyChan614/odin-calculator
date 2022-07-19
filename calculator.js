const display = document.querySelector(".display");
const digitsBtns = document.querySelectorAll(".digits");
const operBtns = document.querySelectorAll(".operators");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const dotBtn = document.querySelector(".dot");
const bsBtn = document.querySelector(".bs");

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
        if (n2 === 0) return "ERROR";
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
    let dotPressed = false;

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
            let tempNum = parseFloat(display.textContent);
            console.log("tempNum", tempNum);
            if (!isNaN(tempNum)){
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
                dotPressed = false;
                console.log("firstNum", firstNum);
                console.log("secondNum", secondNum);
            }
        }));

    equalBtn.addEventListener('click', () => {
        if (display.textContent){
            secondNum = parseFloat(display.textContent);
            dotPressed = false;
        }
        if (firstNum !== null &&
                secondNum !== null &&
                oper !== null){
            let res = operate(operators[oper], firstNum, secondNum);
            display.textContent = +res.toFixed(8);
            }
            else{
                display.textContent = res;
            }
            console.log("res", res);
            firstNum = null;
            secondNum = null;
            oper = null;
            resShown = true;
        }
    );

    clearBtn.addEventListener('click', () => {
        display.textContent = "";
        firstNum = null;
        secondNum = null;
        oper = null;
        resShown = false;
    });

    dotBtn.addEventListener('click', () => {
        if (!dotPressed){
            display.textContent += ".";
            dotPressed = true;
        }
    });

    bsBtn.addEventListener('click', () => {
        let oldContent = display.textContent;
        display.textContent = oldContent.slice(0, oldContent.length-1);
    });
}

calculate();
