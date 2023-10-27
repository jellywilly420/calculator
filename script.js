const periodButton = document.querySelector('.btn-pt');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.btn-eq');
const clearButton = document.querySelector('.clr');
const deleteButton = document.querySelector('.del')
const mainDisplay = document.querySelector('.main-display');
const secondaryDisplay = document.querySelector('.secondary-display');
const operatorDisplay = document.querySelector('.operator-display');

let newOperand, oldOperand, operator;

function add(operand1, operand2){
    return operand1+operand2;
}
function substract(operand1, operand2){
    return operand1-operand2;
}
function multiply(operand1, operand2){
    return (operand1*operand2);
}
function divide(operand1, operand2){
    return (operand1/operand2);
}
function power(operand, power){
    return (operand**power)
}
function solveProblem() {
    let newOperand = Number(mainDisplay.innerText);
    let oldOperand = Number(secondaryDisplay.innerText);
    let operator = operatorDisplay.innerText;

    if (operator === '+') {
        return add(oldOperand, newOperand)
    }
    else if (operator === '-') {
        return substract(oldOperand, newOperand)
    }
    else if (operator === '*') {
        return multiply(oldOperand, newOperand)
    }
    else if (operator === '/') {
        if (newOperand === 0) {
            clearDisplay();
            alert(`The answer is exactly how much you're loved♥`);
        }
        else {
            return divide(oldOperand, newOperand)
        }
    }
    else if (operator === '^') {
        return power(oldOperand, newOperand)
    }
}
function clearMainDisplay() {
    mainDisplay.innerText = '';
}
function clearSecondaryDisplay() {
    secondaryDisplay.innerText = '';
}
function clearOperatorDisplay() {
    operatorDisplay.innerText = '';
}
function clearDisplay() {
    clearMainDisplay();
    clearSecondaryDisplay();
    clearOperatorDisplay();
}
function displayOnMain(number) {
    mainDisplay.innerText = number;
}
function displayOnSecondary(number) {
    secondaryDisplay.innerText = number;
}
function displayOnOperator(op) {
    operatorDisplay.innerText = op;
}
function addToMain(number) {
    mainDisplay.innerText += number;
}

numberButtons.forEach((button)=>{
    button.addEventListener('click', (event)=>{
        if ((mainDisplay.innerText === '0' && (event.target.innerText !== '.'))) {
            clearMainDisplay();
            addToMain(event.target.innerText);
        }
        else {
            addToMain(event.target.innerText);
        }
    })
})
periodButton.addEventListener('click', ()=>{
    if (mainDisplay.innerText === '') {
        addToMain('0');
        addToMain(event.target.innerText);
    }
    else if (![...mainDisplay.innerText].includes('.')){
        addToMain(event.target.innerText);
    }
})

operatorButtons.forEach((button)=>{
    button.addEventListener('click', (event)=>{
        if ((!secondaryDisplay.innerText) && (!mainDisplay.innerText) && (!operatorDisplay.innerText) && (event.target.innerText === '-')) {
            displayOnMain(event.target.innerText);
        }
        else if ((!secondaryDisplay.innerText) && (mainDisplay.innerText) && (mainDisplay.innerText !== '-')){
            displayOnSecondary(mainDisplay.innerText);
            clearMainDisplay();
            displayOnOperator(event.target.innerText);
        }
        else if ((secondaryDisplay.innerText) && (!mainDisplay.innerText)){
            displayOnOperator(event.target.innerText);
        }
        else if ((secondaryDisplay.innerText) && (mainDisplay.innerText) && (operatorDisplay.innerText)) {
            if (solveProblem() === undefined) {
                alert(`A whoopsie has been made :(`);
                clearDisplay();
            }
            else if (solveProblem() === Infinity) {
                alert(`The answer is exactly how much you're loved♥`);
                clearDisplay();
            }
            else {
                displayOnMain(solveProblem());
                clearSecondaryDisplay();
                clearOperatorDisplay();
            }
        }
    })
})

equalButton.addEventListener('click', ()=>{
    if ((mainDisplay.innerText) && (secondaryDisplay.innerText) && (operatorDisplay.innerText)) {
        if (solveProblem() === undefined) {
            alert(`A whoopsie has been made :(`);
            clearDisplay();
        }
        else if (solveProblem() === Infinity) {
            alert(`The answer is exactly how much you're loved♥`);
            clearDisplay();
        }
        else {
            displayOnMain(solveProblem());
            clearSecondaryDisplay();
            clearOperatorDisplay();
        }
    }
})

deleteButton.addEventListener('click', ()=>{
    if (mainDisplay.innerText) {
        let tempArray = [...mainDisplay.innerText];
        tempArray.pop();
        displayOnMain(tempArray.join(''));
    }
})

clearButton.addEventListener('click', ()=>{
    clearDisplay();
})
// console.log(numberButtons)