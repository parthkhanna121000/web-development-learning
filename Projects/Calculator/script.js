
const currentOperand = document.getElementById("current-operand");
const previousOperand = document.getElementById("previous-operand");

let currentValue = "0";
let previousValue = "";
let operator = null;
let shouldResetScreen = false;

// Update calculator display
function updateDisplay() {
    currentOperand.textContent = currentValue;
}

// Add a number
function appendNumber(number) {
    if (currentValue === "Error") {
        currentValue = "0";
    }

    if (shouldResetScreen) {
        currentValue = number;
        shouldResetScreen = false;
        updateDisplay();
        return;
    }

    if (currentValue === "0") {
        currentValue = number;
    } else {
        currentValue += number;
    }

    updateDisplay();
}

// Add decimal point
function addDecimal() {
    if (shouldResetScreen || currentValue === "Error") {
        currentValue = "0";
        shouldResetScreen = false;
    }

    if (!currentValue.includes(".")) {
        currentValue += ".";
    }

    updateDisplay();
}

// Choose an operator
function chooseOperator(selectedOperator) {
    if (currentValue === "Error") return;

    if (operator !== null && !shouldResetScreen) {
        calculate();
    }

    previousValue = currentValue;
    operator = selectedOperator;
    shouldResetScreen = true;

    previousOperand.textContent =
        `${previousValue} ${operator}`;
}

// Perform calculation
function calculate() {
    if (operator === null || shouldResetScreen) return;

    const firstNumber = Number(previousValue);
    const secondNumber = Number(currentValue);

    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                currentValue = "Error";
                result = null;
            } else {
                result = firstNumber / secondNumber;
            }
            break;
    }

    if (result !== null) {
        currentValue = String(
            Number(result.toPrecision(12))
        );
    }

    previousValue = "";
    operator = null;
    shouldResetScreen = true;
    previousOperand.textContent = "";

    updateDisplay();
}

// Clear everything
function clearCalculator() {
    currentValue = "0";
    previousValue = "";
    operator = null;
    shouldResetScreen = false;
    previousOperand.textContent = "";

    updateDisplay();
}

// Delete last digit
function deleteNumber() {
    if (currentValue === "Error" || shouldResetScreen) {
        currentValue = "0";
        shouldResetScreen = false;
    } else {
        currentValue = currentValue.slice(0, -1);

        if (currentValue === "" || currentValue === "-") {
            currentValue = "0";
        }
    }

    updateDisplay();
}

// Percentage
function percentage() {
    if (currentValue === "Error") return;

    currentValue = String(Number(currentValue) / 100);
    updateDisplay();
}

// Handle button clicks
document.querySelector(".buttons").addEventListener("click", (event) => {
    const button = event.target;

    if (button.dataset.number !== undefined) {
        appendNumber(button.dataset.number);
    }

    if (button.dataset.operator) {
        chooseOperator(button.dataset.operator);
    }

    switch (button.dataset.action) {
        case "clear":
            clearCalculator();
            break;

        case "delete":
            deleteNumber();
            break;

        case "decimal":
            addDecimal();
            break;

        case "calculate":
            calculate();
            break;

        case "percentage":
            percentage();
            break;
    }
});

// Keyboard support
document.addEventListener("keydown", (event) => {
    if (event.key >= "0" && event.key <= "9") {
        appendNumber(event.key);
    }

    if (event.key === ".") {
        addDecimal();
    }

    if (["+", "-", "*", "/"].includes(event.key)) {
        chooseOperator(event.key);
    }

    if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    if (event.key === "Backspace") {
        deleteNumber();
    }

    if (event.key === "Escape") {
        clearCalculator();
    }
});
