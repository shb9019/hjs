const path = require('path');

module.exports = {
  target: 'web',
  entry: './src/index.js',
  output: {
    filename: 'babel-plugin-test.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'babel-plugin-test',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  mode: 'production'
};
