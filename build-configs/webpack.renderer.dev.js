const {merge} = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack-dev-server port
const devServerPort = 5678;

module.exports = merge(baseConfig, {
  mode: 'development',
  target: 'electron-renderer',
  entry: {
    danmu: './src/renderer/danmu.js',
    preferences: './src/renderer/preferences.js'
  },
  output: {
    /*
     * Use "http://" protocol to load js files instead of "file://" protocol.
     * This http service is started by webpack-dev-server, which supports webpack's "Hot Module Replacement".
     */
    publicPath: `http://localhost:${devServerPort}/`
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'danmu.html',
      template: './public/renderer.html',
      chunks: ['danmu'],
      meta: {
        'Content-Security-Policy': {
          'http-equiv': 'Content-Security-Policy',
          'content': `script-src \'self\' http://localhost:${devServerPort};`
        }
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'preferences.html',
      template: './public/renderer.html',
      chunks: ['preferences'],
      meta: {
        'Content-Security-Policy': {
          'http-equiv': 'Content-Security-Policy',
          'content': `script-src \'self\' http://localhost:${devServerPort};`
        }
      }
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'dist'),
    port: devServerPort
  }
});
