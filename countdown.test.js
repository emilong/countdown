const { solvePN, polishNotationToInfix } = require("./countdown");

describe("polishNotationToInfix", () => {
  test("with a single number returns a single number", () => {
    expect(polishNotationToInfix([100])).toEqual("100");
  });

  test("with a simple sum returns unparen'd sum", () => {
    expect(polishNotationToInfix(["+", 100, 100])).toEqual("100 + 100");
  });

  test("with a simple subtraction returns unparen'd subtraction", () => {
    expect(polishNotationToInfix(["-", 100, 100])).toEqual("100 - 100");
  });

  test("with a simple mult returns unparen'd mult", () => {
    expect(polishNotationToInfix(["*", 100, 100])).toEqual("100 * 100");
  });

  test("with a simple div returns unparen'd div", () => {
    expect(polishNotationToInfix(["/", 100, 100])).toEqual("100 / 100");
  });

  test("with a nested sum, returns unparen'd sum", () => {
    expect(polishNotationToInfix(["+", 100, "+", 100, 100])).toEqual(
      "100 + 100 + 100"
    );
  });

  test("with a nested sum, returns unparen'd sum", () => {
    expect(polishNotationToInfix(["+", "+", 100, 100, 100])).toEqual(
      "100 + 100 + 100"
    );
  });

  test("with a nested sum under a mul, returns paren'd sum", () => {
    expect(polishNotationToInfix(["*", "+", 100, 200, 300])).toEqual(
      "(100 + 200) * 300"
    );
  });

  test("with a nested sum under a mul, returns paren'd sum", () => {
    expect(polishNotationToInfix(["*", 300, "+", 100, 200])).toEqual(
      "300 * (100 + 200)"
    );
  });

  test("with a nested sum under a div, returns paren'd sum", () => {
    expect(polishNotationToInfix(["/", "+", 100, 200, 300])).toEqual(
      "(100 + 200) / 300"
    );
  });

  test("with a nested sum under a mul, returns paren'd sum", () => {
    expect(polishNotationToInfix(["/", 300, "+", 100, 200])).toEqual(
      "300 / (100 + 200)"
    );
  });
});

describe("solvePN", () => {
  test("a problem where the number is in the selection", () => {
    expect(solvePN(100, [100])).toEqual([[100]]);
  });

  test("a simple sum", () => {
    expect(solvePN(101, [100, 1])).toEqual([["+", 100, 1], ["+", 1, 100]]);
  });

  test("a sum where a number is unused", () => {
    expect(solvePN(101, [100, 1, 4])).toEqual([["+", 100, 1], ["+", 1, 100]]);
  });

  test("a simple difference", () => {
    expect(solvePN(99, [100, 1])).toEqual([["-", 100, 1]]);
  });

  test("a difference where a number is unused", () => {
    expect(solvePN(99, [100, 1, 4])).toEqual([["-", 100, 1]]);
  });

  test("a simple multiple", () => {
    expect(solvePN(200, [100, 2])).toEqual([["*", 100, 2], ["*", 2, 100]]);
  });

  test("a multiple with unused numbers", () => {
    expect(solvePN(200, [100, 2, 3])).toEqual([["*", 100, 2], ["*", 2, 100]]);
  });

  test("a multiple requiring a grouped sum", () => {
    expect(solvePN(300, [100, 2, 1])).toEqual([
      ["*", 100, "+", 2, 1],
      ["*", 100, "+", 1, 2]
    ]);
  });

  test("a divisor", () => {
    expect(solvePN(300, [100, 2, 6])).toEqual([
      ["*", 100, "/", 6, 2],
      ["/", "*", 100, 6, 2],
      ["/", "*", 6, 100, 2],
      ["*", 6, "/", 100, 2]
    ]);
  });
});
