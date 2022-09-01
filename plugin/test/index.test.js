import path from 'path';
import pluginTester from 'babel-plugin-tester';
import hjsPlugin from '../src';

pluginTester({
    plugin: hjsPlugin,
    filename: __filename,
    tests: {
        'using fixtures files': {
            fixture: '__fixtures__/changed.js',
            outputFixture: '__fixtures__/changed-output.js',
        },
    },
});