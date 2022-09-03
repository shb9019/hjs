import path from 'path';
import pluginTester from 'babel-plugin-tester';
import hjsPlugin from '../src';

/**
 *  1. [X] Simple unchanged
 *  2. [X] 2 Parameters basic function
 *  3. [X] 3 Parameters basic function
 *  4. [X] 3 Parameters function expression
 *  5. [X] 3 Parameters anonymous function expresion
 *  6. [X] 3 Parameters arrow functions
 *  7. [X] Default parameters
 *  8. [X] IIFE
 *  9. [X] Variadic functions and rest parameters
 * 10. [X] Async functions
 * 11. [X] Changing scope
 * 14. [X] Ensure scope is respected if it is passed through call, bind and apply.
 * 15. [X] Generator functions
 * 17. [X] Arrow functions within in-built functions
 * 18. Dynamically generated functions
 * 19. How would classes work with this enabled?
 * 20. What happens to class constructors?
 * 21. How does "this" keyword work in such curried functions?
 * 22. Using a function constructor
 * 23. Passing callback functions
 * 24. Javascript decorator functions
 * 25. Arrow functions with spread operator
 */

pluginTester({
    plugin: hjsPlugin,
    title: 'Base tests',
    filename: __filename,
    fixtures: path.join(__dirname, '__fixtures__'),
    tests: [
        {
            title: 'function with no params',
            fixture: '__fixtures__/unchanged-test.js',
            snapshot: true,
        },
        {
            title: 'function declaration with 2 parameters',
            fixture: '__fixtures__/2-param-test.js',
            snapshot: true,
        },
        {
            title: 'function declaration with 3 parameters',
            fixture: '__fixtures__/3-param-test.js',
            snapshot: true,
        },
        {
            title: 'anonymous function expression with 3 parameters',
            fixture: '__fixtures__/3-param-anon-FE-test.js',
            snapshot: true,
        },
        {
            title: 'named function expression with 3 parameters',
            fixture: '__fixtures__/3-param-FE-test.js',
            snapshot: true,
        },
        {
            title: 'arrow function expression with 3 parameters',
            fixture: '__fixtures__/3-param-arrow-test.js',
            snapshot: true,
        },
        {
            title: 'nested functions',
            fixture: '__fixtures__/nested-func-test.js',
            snapshot: true,
        },
        {
            title: 'with default parameters at the end',
            fixture: '__fixtures__/default-param-test.js',
            snapshot: true,
        },
        {
            title: 'with default parameters in between ',
            fixture: '__fixtures__/partial-default-param-test.js',
            snapshot: true,
        },
        {
            title: 'iife',
            fixture: '__fixtures__/iife-test.js',
            snapshot: true,
        },
        {
            title: 'with one rest parameters field',
            fixture: '__fixtures__/rest-param-test.js',
            snapshot: true,
        },
        {
            title: 'async function declaration',
            fixture: '__fixtures__/async-func-test.js',
            snapshot: true,
        },
        {
            title: 'async function expression',
            fixture: '__fixtures__/async-func-expr-test.js',
            snapshot: true,
        },
        {
            title: 'async arrow function expression',
            fixture: '__fixtures__/async-arrow-test.js',
            snapshot: true,
        },
        {
            title: 'function using parent object\'s variables',
            fixture: '__fixtures__/preserve-this-test.js',
            snapshot: true,
        },
        {
            title: 'generator function',
            fixture: '__fixtures__/generator-test.js',
            snapshot: true,
        },
        {
            title: 'arrow function passed to array built-in method',
            fixture: '__fixtures__/array-filter-arrow-test.js',
            snapshot: true,
        },
        {
            title: 'function expression passed to array built-in method',
            fixture: '__fixtures__/array-reduce-func-test.js',
            snapshot: true,
        },
        {
            title: 'function built using function constructor',
            fixture: '__fixtures__/function-constr-test.js',
            snapshot: true,
        }, 
    ]
});