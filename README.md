# Countdown numbers game solver

Mostly just brute forces through all possible combinations using basic
dynamic programming and recursion. The only exception is it won't descend
into multiplication path if the current number is not a multiple.

The basic solver (`solvePN`) generates a list of [Polish Notation](https://en.wikipedia.org/wiki/Polish_notation)
solutions to avoid the need to figure out grouping. Then we run
`polishNotationToInfix` over those solutions to get a nice, normal, infix
string, which is `eval`-able.

There actually are tests. In [jest](https://facebook.github.io/jest/).
