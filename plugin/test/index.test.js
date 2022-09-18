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
 * 18. [X] Dynamically generated functions
 * 19. [X] How would classes work with this enabled?
 * 20. [X] What happens to class constructors?
 * 21. [X] How does "this" keyword work in such curried functions?
 * 22. [X] Using a function constructor
 * 23. Passing callback functions
 * 24. Arrow functions with spread operator
 * 25. Default parameters in arrow functions. Support rest parameter syntax
 */

 pluginTester({
    plugin: hjsPlugin,
    title: 'Basic Function tests',
    // filename: 'basic-function-tests',
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
            title: 'nested functions',
            fixture: '__fixtures__/nested-func-test.js',
            snapshot: true,
        },
    ]
});

pluginTester({
    plugin: hjsPlugin,
    title: 'Basic Function Expression tests',
    //filename: 'function-expr-tests',
    filename: __filename,
    fixtures: path.join(__dirname, '__fixtures__'),
    tests: [
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
            title: 'iife',
            fixture: '__fixtures__/iife-test.js',
            snapshot: true,
        },
    ],
});

pluginTester({
    plugin: hjsPlugin,
    title: 'Async Function tests',
    //filename: 'async-func-tests',
    filename: __filename,
    fixtures: path.join(__dirname, '__fixtures__'),
    tests: [
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
            title: 'async function declaration',
            fixture: '__fixtures__/async-func-test.js',
            snapshot: true,
        },
    ],
});

pluginTester({
    plugin: hjsPlugin,
    title: 'Special Function tests',
    //filename: 'special-func-tests',
    filename: __filename,
    fixtures: path.join(__dirname, '__fixtures__'),
    tests: [
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
    ],
});

pluginTester({
    plugin: hjsPlugin,
    title: 'Function context tests',
    //filename: 'func-context-tests',
    filename: __filename,
    fixtures: path.join(__dirname, '__fixtures__'),
    tests: [
        {
            title: 'function using parent object\'s variables',
            fixture: '__fixtures__/preserve-this-test.js',
            snapshot: true,
        },
    ],
});

pluginTester({
    plugin: hjsPlugin,
    title: 'Default Parameters tests',
    //filename: 'default-params-tests',
    filename: __filename,
    fixtures: path.join(__dirname, '__fixtures__'),
    tests: [
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
    ],
});

pluginTester({
    plugin: hjsPlugin,
    title: 'Rest Parameter tests',
    //filename: 'rest-params-tests',
    filename: __filename,
    fixtures: path.join(__dirname, '__fixtures__'),
    tests: [
        {
            title: 'with one rest parameters field',
            fixture: '__fixtures__/rest-param-test.js',
            snapshot: true,
        },
    ],
});

pluginTester({
    plugin: hjsPlugin,
    title: 'Class tests',
    //filename: 'class-tests',
    filename: __filename,
    fixtures: path.join(__dirname, '__fixtures__'),
    tests: [
        {
            title: 'basic class with constructor',
            fixture: '__fixtures__/class-test.js',
            snapshot: true,
        }, 
        {
            title: 'basic object function referring to object variables',
            fixture: '__fixtures__/obj-context-test.js',
            snapshot: true,
        },
        {
            title: 'basic function prototype',
            fixture: '__fixtures__/function-prototype-test.js',
            snapshot: true,
        },
    ],
});

