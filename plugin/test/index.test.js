import path from 'path';
import pluginTester from 'babel-plugin-tester';
import hjsPlugin from '../src';

/**
 * 1. [X] Simple unchanged
 * 2. [X] 2 Parameters basic function
 * 3. [X] 3 Parameters basic function
 * 4. 3 Parameters function expression
 * 5. 3 Parameters anonymous function expresion
 * 6. 3 Parameters arrow functions
 * 7. Default parameters
 * 7. IIFE
 * 8. Spread parameters
 * 8. Async functions
 * 9. Changing scope
 */

pluginTester({
    plugin: hjsPlugin,
    filename: __filename,
    fixtures: path.join(__dirname, '__fixtures__'),
    // tests: [
    //     {
    //         fixture: '__fixtures__/3-param-FE-test/code.js',
    //         outputFixture: '__fixtures__/3-param-FE-test/output.js',
    //     },
    // ]
});