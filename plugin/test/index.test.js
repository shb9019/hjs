import path from 'path';
import pluginTester from 'babel-plugin-tester';
import hjsPlugin from '../src';

/**
 * 1. Simple unchanged
 * 2. 2 Parameters basic function
 * 3. 3 Parameters basic function
 * 4. 3 Parameters function expression
 * 5. 3 Parameters anonymous function expresion
 * 6. 3 Parameters arrow functions
 * 7. IIFE
 * 8. Async functions
 * 9. Changing scope
 */

pluginTester({
    plugin: hjsPlugin,
    filename: __filename,
    fixtures: path.join(__dirname, '__fixtures__'),
    // tests: [
    //     {
    //         fixture: '__fixtures__/3-param-test/code.js',
    //         outputFixture: '__fixtures__/3-param-test/output.js',
    //     },
    // ]
});