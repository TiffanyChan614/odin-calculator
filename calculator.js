const displayVar = document.querySelector(".display-content");
const digitsBtns = document.querySelectorAll(".digits");
const operBtns = document.querySelectorAll(".operators");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const dotBtn = document.querySelector(".dot");
const bsBtn = document.querySelector(".bs");

var operators = {
    "+": function(n1, n2){
        return n1 + n2;
    },

    "-": function(n1, n2){
        return n1 - n2;
    },

    "*": function(n1, n2){
        return n1 * n2;
    },

    "/": function(n1, n2){
        if (n2 === 0) return "ERROR";
        return n1 / n2;
    },

    "%": function(n1, n2){
        return n1 % n2;
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
        // console.log(resShown);
        if (resShown) {
            displayVar.textContent = "";
            resShown = false;
        }
        const num = button.textContent;
        displayVar.textContent += num;
    }));

    Array.from(operBtns).forEach((button) =>
        button.addEventListener('click', () => {
            let tempNum = parseFloat(displayVar.textContent);
            // console.log("tempNum", tempNum);
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
                displayVar.textContent = "";
                dotPressed = false;
                // console.log("firstNum", firstNum);
                // console.log("secondNum", secondNum);
            }
            else if(oper) oper = button.textContent;
        }));

    equalBtn.addEventListener('click', () => {
        if (displayVar.textContent){
            secondNum = parseFloat(displayVar.textContent);
            dotPressed = false;
        }

        if (firstNum !== null &&
                secondNum !== null &&
                oper !== null){
            let res = operate(operators[oper], firstNum, secondNum);
            if (typeof res === "number")
                displayVar.textContent = +res.toFixed(8);
            else
                displayVar.textContent = res;
            // console.log("res", res);
            firstNum = null;
            secondNum = null;
            oper = null;
            resShown = true;
        }
    });

    clearBtn.addEventListener('click', () => {
        displayVar.textContent = "";
        firstNum = null;
        secondNum = null;
        oper = null;
        resShown = false;
    });

    dotBtn.addEventListener('click', () => {
        if (!dotPressed){
            displayVar.textContent += ".";
            dotPressed = true;
        }
    });

    bsBtn.addEventListener('click', () => {
        let oldContent = displayVar.textContent;
        displayVar.textContent = oldContent.slice(0, oldContent.length-1);
    });
}

calculate();
