const omit = (arr, i) => arr.filter((_, j) => i !== j);

const needsWrapping = stack => stack[0] === "+" || stack[0] === "-";

// returns { consumed: <infix string>, unconsumed: <remaining stack> }
const consumePN = stack => {
  if (typeof stack[0] === "number") {
    return { consumed: `${stack[0]}`, unconsumed: stack.slice(1) };
  }

  const [op] = stack;
  const leftStack = stack.slice(1);

  const { consumed: leftSide, unconsumed: rightStack } = consumePN(leftStack);

  const { consumed: rightSide, unconsumed } = consumePN(rightStack);

  switch (op) {
    case "+":
    case "-":
      return {
        consumed: `${leftSide} ${op} ${rightSide}`,
        unconsumed
      };
    case "*":
    case "/": {
      const wrappedLeftSide = needsWrapping(leftStack)
        ? `(${leftSide})`
        : leftSide;
      const wrappedRightSide = needsWrapping(rightStack)
        ? `(${rightSide})`
        : rightSide;

      return {
        consumed: `${wrappedLeftSide} ${op} ${wrappedRightSide}`,
        unconsumed
      };
    }
  }
};

const polishNotationToInfix = stack => consumePN(stack).consumed;

const solvePN = (target, numbers) =>
  numbers.reduce((acc, number, i) => {
    if (number === target) {
      return acc.concat([[numbers[i]]]);
    }

    const others = omit(numbers, i);

    const sum = solvePN(target - number, others).map(soln =>
      ["+", number].concat(soln)
    );

    const diff = solvePN(target + number, others).map(soln =>
      ["-"].concat(soln).concat(number)
    );

    const mul = target % number === 0
      ? solvePN(target / number, others).map(soln => ["*", number].concat(soln))
      : [];

    const div = solvePN(number * target, others).map(soln =>
      ["/"].concat(soln).concat(number)
    );

    return acc.concat(sum, diff, mul, div);
  }, []);

const solve = (target, numbers) =>
  solvePN(target, numbers).map(polishNotationToInfix);

module.exports = { solve, solvePN, polishNotationToInfix };
