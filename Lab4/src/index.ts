const add = (x: number, y: number): number => x + y;
const subtract = (x: number, y: number): number => x - y;
const multiply = (x: number, y: number): number => x * y;
const divide = (x: number, y: number): number => y === 0 ? NaN : x / y;
const power = (x: number, y: number): number => Math.pow(x, y);
const squareRoot = (x: number): number => x < 0 ? NaN : Math.sqrt(x);

type Operation = '+' | '-' | '*' | '/' | '^' | 'sqrt';

const getOperation = (operation: Operation) => {
    const operations: Record<Operation, (...args: number[]) => number> = {
        '+': add,
        '-': subtract,
        '*': multiply,
        '/': divide,
        '^': power,
        'sqrt': squareRoot
    };
    return operations[operation];
};

const compute = (num1: number, num2: number, operation: Operation): number => {
    const f: (...args: number[]) => number = getOperation(operation);
    return operation !== 'sqrt' ? f(num1, num2) : f(num1);
};

type CalculatorState = { displayedMessage: string; };

const calculate = (operation: Operation): void => {
    const num1Input = document.getElementById('num1') as HTMLInputElement;
    const num1: number = parseFloat(num1Input.value) || 0;
    if (num1 === 0) num1Input.value = (num1).toString()

    const num2Input = document.getElementById('num2') as HTMLInputElement;
    const num2: number = parseFloat(num2Input.value) || 0;
    if (num2 === 0) num2Input.value = (num2).toString()

    const display = document.getElementById('display') as HTMLInputElement;
    const currentState: CalculatorState = {displayedMessage: display.value};

    try {
        const result: number = compute(num1, num2, operation);

        const newState: CalculatorState = {
            ...currentState,
            displayedMessage: isNaN(result) ? 'ERROR' : result.toString()
        };
        display.value = newState.displayedMessage;
    } catch (error) {
        display.value = 'ERROR';
    }
};

const clearDisplay = (): void => {
    const display = document.getElementById('display') as HTMLInputElement;
    const num1 = document.getElementById('num1') as HTMLInputElement;
    const num2 = document.getElementById('num2') as HTMLInputElement;

    display.value = '';
    num1.value = '';
    num2.value = '';
};