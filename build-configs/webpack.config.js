const path = require('path');
const mainConfig = require('./webpack.main');
const rendererProdConfig = require('./webpack.renderer.prod');
const rendererDevConfig = require('./webpack.renderer.dev');

// clean webpack's output directory
const rimraf = require('rimraf');
rimraf.sync(path.resolve(__dirname, '..', 'dist'));

module.exports = process.env.NODE_ENV === 'production'
    ? [mainConfig, rendererProdConfig]
    : [mainConfig, rendererDevConfig];
