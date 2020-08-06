const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: process.env.NODE_ENV,
  target: 'electron-main',
  entry: {
    main: './src/main/main.js'
  }
});
