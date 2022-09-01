import path from 'path';
import pluginTester from 'babel-plugin-tester';
import hjsPlugin from '../src';

pluginTester({
    plugin: hjsPlugin,
    filename: __filename,
    // fixtures: path.join(__dirname, '__fixtures__'),
    tests: [
        {
            fixture: '__fixtures__/2-param-test/code.js',
            outputFixture: '__fixtures__/2-param-test/output.js',
        },
    ]
});