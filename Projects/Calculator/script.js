
const currentOperand = document.getElementById("current-operand");
const previousOperand = document.getElementById("previous-operand");
const memoryIndicator = document.getElementById("memory-indicator");
const historyPanel = document.getElementById("history-panel");
const historyList = document.getElementById("history-list");
const angleButton = document.querySelector('[data-action="angle"]');

let expression = "";
let memory = 0;
let angleMode = "DEG";
let history = [];
let justCalculated = false;

// =================================
// DISPLAY
// =================================

function updateDisplay() {
    currentOperand.textContent = expression || "0";
    angleButton.textContent = angleMode;
    memoryIndicator.textContent = memory !== 0 ? "M" : "";
}

function insertValue(value) {
    if (justCalculated) {
        if (/^[0-9.]$/.test(value) || value === "pi" || value === "e") {
            expression = "";
        }
        justCalculated = false;
    }

    if (expression.length + value.length > 120) return;

    expression += value;
    updateDisplay();
}

function clearCalculator() {
    expression = "";
    justCalculated = false;
    previousOperand.textContent = "";
    updateDisplay();
}

function deleteLast() {
    if (justCalculated) {
        clearCalculator();
        return;
    }

    if (!expression) return;

    // Remove complete function names instead of one character.
    const functionMatch = expression.match(
        /(sqrt|sin|cos|tan|log|ln|abs)\($/
    );

    if (functionMatch) {
        expression = expression.slice(0, -functionMatch[0].length);
    } else if (expression.endsWith("pi")) {
        expression = expression.slice(0, -2);
    } else {
        expression = expression.slice(0, -1);
    }

    updateDisplay();
}

// =================================
// EXPRESSION TOKENIZER
// =================================

function tokenize(input) {
    const tokens = [];
    let position = 0;

    while (position < input.length) {
        const remaining = input.slice(position);

        if (/^\s/.test(remaining)) {
            position++;
            continue;
        }

        const numberMatch = remaining.match(/^(?:\d+\.?\d*|\.\d+)/);

        if (numberMatch) {
            tokens.push({
                type: "number",
                value: Number(numberMatch[0])
            });

            position += numberMatch[0].length;
            continue;
        }

        const identifierMatch = remaining.match(/^[a-zA-Z]+/);

        if (identifierMatch) {
            tokens.push({
                type: "identifier",
                value: identifierMatch[0].toLowerCase()
            });

            position += identifierMatch[0].length;
            continue;
        }

        const character = input[position];

        if ("+-*/^!%()".includes(character)) {
            tokens.push({
                type: "operator",
                value: character
            });

            position++;
            continue;
        }

        throw new Error("Invalid character");
    }

    return tokens;
}

// =================================
// SCIENTIFIC EXPRESSION PARSER
// =================================

function evaluateExpression(input) {
    const tokens = tokenize(input);
    let position = 0;

    function peek() {
        return tokens[position];
    }

    function consume(value) {
        if (peek()?.value !== value) {
            throw new Error("Invalid expression");
        }

        position++;
    }

    // Addition and subtraction
    function parseExpression() {
        let value = parseTerm();

        while (peek()?.value === "+" || peek()?.value === "-") {
            const operator = tokens[position++].value;
            const right = parseTerm();

            value = operator === "+"
                ? value + right
                : value - right;
        }

        return value;
    }

    // Multiplication and division
    function parseTerm() {
        let value = parseUnary();

        while (peek()?.value === "*" || peek()?.value === "/") {
            const operator = tokens[position++].value;
            const right = parseUnary();

            if (operator === "/" && right === 0) {
                throw new Error("Cannot divide by zero");
            }

            value = operator === "*"
                ? value * right
                : value / right;
        }

        return value;
    }

    // Positive and negative numbers
    function parseUnary() {
        if (peek()?.value === "+") {
            position++;
            return parseUnary();
        }

        if (peek()?.value === "-") {
            position++;
            return -parseUnary();
        }

        return parsePower();
    }

    // Exponents (right associative)
    function parsePower() {
        const base = parsePostfix();

        if (peek()?.value === "^") {
            position++;
            return Math.pow(base, parseUnary());
        }

        return base;
    }

    // Factorial and percentage
    function parsePostfix() {
        let value = parsePrimary();

        while (peek()?.value === "!" || peek()?.value === "%") {
            const operator = tokens[position++].value;

            if (operator === "!") {
                if (!Number.isInteger(value) || value < 0 || value > 170) {
                    throw new Error("Invalid factorial");
                }

                let result = 1;

                for (let i = 2; i <= value; i++) {
                    result *= i;
                }

                value = result;
            } else {
                value /= 100;
            }
        }

        return value;
    }

    // Numbers, constants, brackets and functions
    function parsePrimary() {
        const token = peek();

        if (!token) {
            throw new Error("Incomplete expression");
        }

        if (token.type === "number") {
            position++;
            return token.value;
        }

        if (token.value === "(") {
            position++;

            const value = parseExpression();

            consume(")");

            return value;
        }

        if (token.type === "identifier") {
            position++;

            if (token.value === "pi") return Math.PI;
            if (token.value === "e") return Math.E;

            const functionName = token.value;

            consume("(");

            const argument = parseExpression();

            consume(")");

            return calculateFunction(functionName, argument);
        }

        throw new Error("Invalid expression");
    }

    const result = parseExpression();

    if (position !== tokens.length) {
        throw new Error("Invalid expression");
    }

    if (!Number.isFinite(result)) {
        throw new Error("Math error");
    }

    return result;
}

// =================================
// SCIENTIFIC FUNCTIONS
// =================================

function calculateFunction(name, value) {
    const radians = angleMode === "DEG"
        ? value * Math.PI / 180
        : value;

    switch (name) {
        case "sin":
            return Math.sin(radians);

        case "cos":
            return Math.cos(radians);

        case "tan":
            if (Math.abs(Math.cos(radians)) < 1e-12) {
                throw new Error("Undefined");
            }
            return Math.tan(radians);

        case "sqrt":
            if (value < 0) throw new Error("Invalid square root");
            return Math.sqrt(value);

        case "log":
            if (value <= 0) throw new Error("Invalid logarithm");
            return Math.log10(value);

        case "ln":
            if (value <= 0) throw new Error("Invalid logarithm");
            return Math.log(value);

        case "abs":
            return Math.abs(value);

        default:
            throw new Error("Unknown function");
    }
}

// =================================
// CALCULATE
// =================================

function calculate() {
    if (!expression) return;

    try {
        const originalExpression = expression;
        const result = evaluateExpression(expression);

        const formattedResult = Number(
            result.toPrecision(12)
        ).toString();

        previousOperand.textContent =
            `${originalExpression} =`;

        expression = formattedResult;
        justCalculated = true;

        history.unshift({
            expression: originalExpression,
            result: formattedResult
        });

        renderHistory();
    } catch (error) {
        previousOperand.textContent = error.message;
        currentOperand.textContent = "Error";
        expression = "";
        justCalculated = false;
        return;
    }

    updateDisplay();
}

// =================================
// MEMORY FUNCTIONS
// =================================

function getCurrentValue() {
    if (!expression) return 0;

    return evaluateExpression(expression);
}

function memoryClear() {
    memory = 0;
    updateDisplay();
}

function memoryRecall() {
    insertValue(String(memory));
}

function memoryAdd() {
    try {
        memory += getCurrentValue();
        updateDisplay();
    } catch {
        previousOperand.textContent = "Invalid memory operation";
    }
}

function memorySubtract() {
    try {
        memory -= getCurrentValue();
        updateDisplay();
    } catch {
        previousOperand.textContent = "Invalid memory operation";
    }
}

// =================================
// OTHER OPERATIONS
// =================================

function toggleAngleMode() {
    angleMode = angleMode === "DEG" ? "RAD" : "DEG";
    updateDisplay();
}

function toggleSign() {
    if (!expression) return;

    expression = `-(${expression})`;
    justCalculated = false;

    updateDisplay();
}

function percentage() {
    if (!expression) return;

    expression += "%";
    justCalculated = false;

    updateDisplay();
}

// =================================
// HISTORY
// =================================

function renderHistory() {
    historyList.innerHTML = "";

    history.forEach((item, index) => {
        const li = document.createElement("li");
        const button = document.createElement("button");

        button.type = "button";
        button.style.cssText =
            "width:100%;height:auto;padding:8px;background:transparent;" +
            "border:0;text-align:left;color:inherit;font-size:13px;";

        button.textContent =
            `${item.expression} = ${item.result}`;

        button.addEventListener("click", () => {
            expression = item.result;
            justCalculated = true;
            previousOperand.textContent = item.expression;
            updateDisplay();
        });

        li.appendChild(button);
        historyList.appendChild(li);
    });
}

function toggleHistory() {
    historyPanel.hidden = !historyPanel.hidden;
}

function clearHistory() {
    history = [];
    renderHistory();
}

// =================================
// BUTTON EVENT LISTENER
// =================================

document.querySelector(".buttons").addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) return;

    if (button.dataset.insert !== undefined) {
        insertValue(button.dataset.insert);
        return;
    }

    switch (button.dataset.action) {
        case "clear":
            clearCalculator();
            break;

        case "delete":
            deleteLast();
            break;

        case "calculate":
            calculate();
            break;

        case "percentage":
            percentage();
            break;

        case "sign":
            toggleSign();
            break;

        case "angle":
            toggleAngleMode();
            break;

        case "memory-clear":
            memoryClear();
            break;

        case "memory-recall":
            memoryRecall();
            break;

        case "memory-add":
            memoryAdd();
            break;

        case "memory-subtract":
            memorySubtract();
            break;

        case "history":
            toggleHistory();
            break;
    }
});

// =================================
// HISTORY CLEAR BUTTON
// =================================

document.querySelector('[data-action="history-clear"]')
    .addEventListener("click", clearHistory);

// =================================
// KEYBOARD SUPPORT
// =================================

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (/^[0-9.]$/.test(key)) {
        insertValue(key);
    } else if (["+", "-", "*", "/", "^", "(", ")", "!"].includes(key)) {
        insertValue(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearCalculator();
    } else if (key === "%") {
        percentage();
    }
});

// Initial display
updateDisplay();
