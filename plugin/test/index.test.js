import path from 'path';
import pluginTester from 'babel-plugin-tester';
import hjsPlugin from '../src';

/**
 * 1. [X] Simple unchanged
 * 2. [X] 2 Parameters basic function
 * 3. [X] 3 Parameters basic function
 * 4. [X] 3 Parameters function expression
 * 5. [X] 3 Parameters anonymous function expresion
 * 6. [X] 3 Parameters arrow functions
 * 7. [X] Default parameters
 * 8. [X] IIFE
 * 9. Variadic functions and rest parameters
 * 10. Async functions
 * 11. Changing scope
 * 12. Optional parameters
 * 13. Decorators
 * 14. Ensure scope is respected if it is passed through call, bind and apply.
 * 15. Generator functions
 * 16. Figure out directives
 * 17. Arrow functions within in-built functions
 * 18. Dynamically generated functions
 */

pluginTester({
    plugin: hjsPlugin,
    filename: __filename,
    fixtures: path.join(__dirname, '__fixtures__'),
    tests: [
        {
            fixture: '__fixtures__/default-param-test.js',
            snapshot: true,
        },
        {
            fixture: '__fixtures__/partial-default-param-test.js',
            snapshot: true,
        },
        {
            fixture: '__fixtures__/iife-test.js',
            snapshot: true,
        },
        {
            fixture: '__fixtures__/rest-param-test.js',
            snapshot: true,
        },
    ]
});