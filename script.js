
var decimalBtn = document.getElementById('calc-decimal');
var clearBtn = document.getElementById('calc-clear');
var clearOneBtn = document.getElementById('calc-clear-one');
var backspaceBtn = document.getElementById('calc-backspace');
var plusMinusBtn = document.getElementById('calc-plus-minus');
var displayValElement = document.getElementById('calc-display-val');

var displayVal = '0';
var pendingVal;
var evalStringArray = [];

var calcNumBtns = document.getElementsByClassName('calc-btn-num');
var calcOperatorBtns = document.getElementsByClassName('calc-btn-operator');

var displayHistoryElement = [];
var history = [];

for (let i = 1; i <= 8; i++) {
    displayHistoryElement[i] = document.getElementById("history-value" + i);
}
for (let i = 0; i <= 7; i++) {
    history[i] = "";
}

var updateDisplayVal = (clickObj) => {
    var btnText = clickObj.target.innerText;

    if (displayVal === '0')
        displayVal = '';

    if (displayVal.length <= 12) {
        displayVal += btnText;
        displayValElement.innerText = displayVal;
    }
}

var removeZeros = (inputString) => {
    for (let i = inputString.length - 1; i > 0; i--) {
        if (inputString[i] != "0") {
            return inputString.substring(0, i + 1);
        }
    }
}

var performOperation = (clickObj) => {
    var operator = clickObj.target.innerText;

    switch (operator) {
        case '+':
            pendingVal = displayVal;
            displayVal = '0';
            displayValElement.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('+');
            break;

        case '-':
            pendingVal = displayVal;
            displayVal = '0';
            displayValElement.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('-')
            break;

        case 'x':
            pendingVal = displayVal;
            displayVal = '0';
            displayValElement.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('*');
            break;

        case '÷':
            pendingVal = displayVal;
            displayVal = '0';
            displayValElement.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('/');
            break;
        case '%':
            pendingVal = displayVal / 100;
            var outputString = removeZeros(parseFloat(pendingVal).toFixed(10));
            if (outputString[outputString.length - 1] == ".") {
                outputString = outputString.substring(0, outputString.length - 1);

            }
            displayValElement.innerText = outputString;
            for (let i = 7; i >= 1; i--) {
                history[i] = history[i - 1];
            }
            history[0] = displayVal + " % = " + outputString;
            for (let i = 1; i <= 8; i++) {
                displayHistoryElement[i].innerHTML = history[i - 1];
            }
            displayVal = outputString;
            break;
        case 'sin':
            pendingVal = Math.sin(displayVal);
            var outputString = removeZeros(parseFloat(pendingVal).toFixed(10));
            if (outputString[outputString.length - 1] == ".") {
                outputString = outputString.substring(0, outputString.length - 1);

            }
            displayValElement.innerText = outputString;
            for (let i = 7; i >= 1; i--) {
                history[i] = history[i - 1];
            }
            history[0] = "sin" + displayVal + " = " + outputString;
            for (let i = 1; i <= 8; i++) {
                displayHistoryElement[i].innerHTML = history[i - 1];
            }
            displayVal = outputString;
            break;

        case 'cos':
            pendingVal = Math.cos(displayVal);
            var outputString = removeZeros(parseFloat(pendingVal).toFixed(10));
            if (outputString[outputString.length - 1] == ".") {
                outputString = outputString.substring(0, outputString.length - 1);

            }
            displayValElement.innerText = outputString;
            for (let i = 7; i >= 1; i--) {
                history[i] = history[i - 1];
            }
            history[0] = "cos" + displayVal + " = " + outputString;
            for (let i = 1; i <= 8; i++) {
                displayHistoryElement[i].innerHTML = history[i - 1];
            }
            displayVal = outputString;
            break;

        case 'tg':
            pendingVal = Math.sin(displayVal) / Math.cos(displayVal);
            var outputString = removeZeros(parseFloat(pendingVal).toFixed(10));
            if (outputString[outputString.length - 1] == ".") {
                outputString = outputString.substring(0, outputString.length - 1);

            }
            displayValElement.innerText = outputString;
            for (let i = 7; i >= 1; i--) {
                history[i] = history[i - 1];
            }
            history[0] = "tg" + displayVal + " = " + outputString;
            for (let i = 1; i <= 8; i++) {
                displayHistoryElement[i].innerHTML = history[i - 1];
            }
            displayVal = outputString;
            break;

        case 'cotg':
            pendingVal = Math.cos(displayVal) / Math.sin(displayVal);
            var outputString = removeZeros(parseFloat(pendingVal).toFixed(10));
            if (outputString[outputString.length - 1] == ".") {
                outputString = outputString.substring(0, outputString.length - 1);

            }
            displayValElement.innerText = outputString;
            for (let i = 7; i >= 1; i--) {
                history[i] = history[i - 1];
            }
            history[0] = "cotg" + displayVal + " = " + outputString;
            for (let i = 1; i <= 8; i++) {
                displayHistoryElement[i].innerHTML = history[i - 1];
            }
            displayVal = outputString;
            break;

        case '=':
            if (evalStringArray[1].valueOf() == "/" &&
                displayVal.valueOf() == "0") {
                displayValElement.innerText = "Cannot divide by 0";
                break;
            }

            evalStringArray.push(displayVal);
            var evaluation = eval(evalStringArray.join(' '));
            displayVal = evaluation + '';
            var outputString = removeZeros(parseFloat(displayVal).toFixed(10));
            if (outputString[outputString.length - 1] == ".") {
                outputString = outputString.substring(0, outputString.length - 1);

            }
            displayValElement.innerText = outputString;

            for (let i = 7; i >= 1; i--) {
                history[i] = history[i - 1];
            }
            history[0] = evalStringArray[0];
            history[0] += " " + evalStringArray[1];
            history[0] += " " + evalStringArray[2];
            history[0] += " =";
            history[0] += " " + outputString;

            for (let i = 1; i <= 8; i++) {
                displayHistoryElement[i].innerHTML = history[i - 1];
            }
            evalStringArray = [];
            break;
        default:
            break;


    }
}

function sqrtFunc() {
    pendingVal = Math.sqrt(displayVal);
    var outputString = removeZeros(parseFloat(pendingVal).toFixed(10));
    if (outputString[outputString.length - 1] == ".") {
        outputString = outputString.substring(0, outputString.length - 1);

    }
    displayValElement.innerText = outputString;
    for (let i = 7; i >= 1; i--) {
        history[i] = history[i - 1];
    }
    history[0] = "&#8730;" + displayVal + " = " + outputString;
    for (let i = 1; i <= 8; i++) {
        displayHistoryElement[i].innerHTML = history[i - 1];
    }
    displayVal = outputString;
}
function squareFunc() {
    pendingVal = Math.pow(displayVal, 2);
    var outputString = removeZeros(parseFloat(pendingVal).toFixed(10));
    if (outputString[outputString.length - 1] == ".") {
        outputString = outputString.substring(0, outputString.length - 1);

    }
    displayValElement.innerText = outputString;
    for (let i = 7; i >= 1; i--) {
        history[i] = history[i - 1];
    }
    history[0] = displayVal + " <sup>2</sup> = " + outputString;
    for (let i = 1; i <= 8; i++) {
        displayHistoryElement[i].innerHTML = history[i - 1];
    }
    displayVal = outputString;
}
function piFunc() {
    pendingVal = 3.14159265359;
    displayValElement.innerText = pendingVal;
    for (let i = 7; i >= 1; i--) {
        history[i] = history[i - 1];
    }
    history[0] = "&#960; = " + pendingVal;
    for (let i = 1; i <= 8; i++) {
        displayHistoryElement[i].innerHTML = history[i - 1];
    }
    displayVal = pendingVal.toString();
}

for (let i = 0; i < calcNumBtns.length; i++) {
    calcNumBtns[i].addEventListener('click', updateDisplayVal, false);
}

for (let i = 0; i < calcOperatorBtns.length; i++) {
    calcOperatorBtns[i].addEventListener('click', performOperation, false);
}

clearBtn.onclick = () => {
    displayVal = '0';
    pendingVal = undefined;
    evalStringArray = [];
    displayValElement.innerHTML = displayVal;
}

clearOneBtn.onclick = () => {
    displayVal = '0';
    displayValElement.innerHTML = displayVal;
}

backspaceBtn.onclick = () => {
    let lengthOfDisplayVal = displayVal.length;
    displayVal = displayVal.slice(0, lengthOfDisplayVal - 1);

    if (displayVal === '0')
        displayVal = '0';
    displayValElement.innerText = displayVal;
}

decimalBtn.onclick = () => {
    if (!displayVal.includes('.'))
        displayVal += '.';
    displayValElement.innerText = displayVal;
}

plusMinusBtn.onclick = () => {
    if (!displayVal.includes('-') & displayVal === '0') {
        displayVal = displayVal;
        displayValElement.innerText = displayVal;
    } else if (!displayVal.includes('-')) {
        displayVal = '-' + displayVal;
        displayValElement.innerText = displayVal;
    } else if (displayVal.includes('-')) {
        displayVal = displayVal.replace('-', '');
        displayValElement.innerText = displayVal;
    }
    displayValElement.innerText = displayVal;
}

function showFunction() {
    document.getElementById("calc-dropdown").classList.toggle("show");
    document.getElementById("calc-dropdown1").classList.toggle("show");
}
