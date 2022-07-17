const display = document.querySelector(".display");
const digitsBtns = document.querySelectorAll(".digits");
var displayValue = "";

function add(n1, n2){
    return n1 + n2;
}

function subtract(n1, n2){
    return n1 - n2;
}

function multiply(n1, n2){
    return n1 * n2;
}

function divide(n1, n2){
    return n1 / n2;
}

function operate(operator, n1, n2){
    return operator(n1, n2);
}

function fillDisplay(){
    Array.from(digitsBtns).forEach(button =>
        button.addEventListener('click', () => {
            const num = button.textContent;
            displayValue += num;
            display.textContent += num;
            //console.log(displayValue);
        }));
}

fillDisplay()
