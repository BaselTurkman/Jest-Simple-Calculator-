function calc(...operations) {
    if (operations.length < 3 || operations.length % 2 === 0) {
        throw new Error("Invalid number of arguments");
    }

    let tokens = [...operations];


    tokens = tokens.map(token => (typeof token === 'number' && token >= 1000 ? 0 : token));


    if (tokens.some((token, index) => index % 2 === 0 && typeof token !== 'number')) {
        throw new Error("Invalid input type");
    }

    // Handle multiplication and division first
    for (let i = 1; i < tokens.length - 1; i += 2) {
        if (tokens[i] === '*' || tokens[i] === '/') {
            let result = performOperation(tokens[i - 1], tokens[i], tokens[i + 1]);
            tokens.splice(i - 1, 3, result);
            i -= 2;
        }
    }

    // Handle addition and subtraction
    let result = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
        result = performOperation(result, tokens[i], tokens[i + 1]);
    }

    return result;
}

function performOperation(num1, operator, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                throw new Error('Division by zero');
            }
            return num1 / num2;
        default:
            throw new Error('Invalid operator');
    }
}

module.exports = calc;
