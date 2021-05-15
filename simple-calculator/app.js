const display = document.getElementById('display');
const operatorSign = document.getElementById('operator');
let currentNumber = null;
let nextNumber = null;
let nextOperator = null;
let supremeOperator = null;

const resetDisplay = () => {
    display.textContent = '';
    currentNumber = null;
    nextNumber = null;
    nextOperator = null;
    supremeOperator = null;
    operatorSign.textContent = '';
}

const softDisplayReset = (operator) => {
    display.textContent = '';
    nextOperator = null;
    supremeOperator = operator;
}

resetDisplay();

const setupFunctionality = () => {
    const buttons = document.querySelectorAll('button');
    [...buttons].forEach(button => {
        button.addEventListener('click', (e) => {

            let dataType = e.target.getAttribute('data');
            let currentDisplayedNumber = +display.textContent.trim();

            if (dataType === 'number') {
                if (nextOperator) softDisplayReset(nextOperator);
                addToDisplay(display.textContent.trim(), e.target.textContent.trim());
            }

            if (dataType === 'clear') {
                resetDisplay();
            }

            if (dataType === 'add') {
                if (supremeOperator) operate(currentDisplayedNumber);

                nextOperator = '+';
                operatorSign.textContent = nextOperator;
                if (!currentNumber) {
                    currentNumber = currentDisplayedNumber;
                } else {
                    nextNumber = currentDisplayedNumber;
                }
            }

            if (dataType === 'substract') {
                if (supremeOperator) operate(currentDisplayedNumber);

                nextOperator = '-';
                operatorSign.textContent = nextOperator;
                if (!currentNumber) {
                    currentNumber = currentDisplayedNumber;
                } else {
                    nextNumber = currentDisplayedNumber;
                }
            }

            if (dataType === 'multiply') {
                if (supremeOperator) operate(currentDisplayedNumber);

                nextOperator = '*';
                operatorSign.textContent = nextOperator;
                if (!currentNumber) {
                    currentNumber = currentDisplayedNumber;
                } else {
                    nextNumber = currentDisplayedNumber;
                }
            }

            if (dataType === 'divide') {
                if (supremeOperator) operate(currentDisplayedNumber);

                nextOperator = '/';
                operatorSign.textContent = nextOperator;
                if (!currentNumber) {
                    currentNumber = currentDisplayedNumber;
                } else {
                    nextNumber = currentDisplayedNumber;
                }
            }

            if (dataType === 'equals') {
                operate(currentDisplayedNumber);
            }

            if (dataType === 'decimal') {
                if (display.textContent.trim() === '') return false;
                if (display.textContent.trim().includes('.')) return false;
                addToDisplay(display.textContent.trim(), e.target.textContent.trim());
            }

            if (dataType === 'backspace') {
                numberArray = currentDisplayedNumber.toString().split('');
                poppedLastEl = numberArray.pop();

                if (!supremeOperator) currentNumber = numberArray.join('');

                addToDisplay('', numberArray.join(''));
            }
        })
    })
}

setupFunctionality();

const operate = (currentDisplayedNumber) => {

    nextNumber = currentDisplayedNumber;
    if (!supremeOperator) return false;

    instructions = `return ${currentNumber} ${supremeOperator} ${nextNumber};`;
    let operation = new Function(instructions)();

    currentNumber = operation;
    nextNumber = null;
    supremeOperator = null
    operatorSign.textContent = '';

    if (operation === Infinity) {
        addToDisplay('', 'OMEGALUL');
    } else {
        addToDisplay('', /^-?\d+$/.test(String(operation)) ? operation : operation.toFixed(3));
    }
}

const addToDisplay = (currentValue, valueToInclude) => {
    if (display.textContent.length >= 12) return false;
    display.textContent = currentValue + valueToInclude;

    //add functionality to get rid of all zeroes from the beggining of the number
    /*     if (display.textContent.match(\0\)) {
            display.textContent = valueToInclude;
        } */

}