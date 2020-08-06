const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  target: 'electron-renderer',
  entry: {
    barrage: './src/renderer/barrage.js',
    preferences: './src/renderer/preferences.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Barrage',
      filename: 'barrage.html',
      template: './public/renderer.html',
      chunks: ['barrage'],
      meta: {
        'Content-Security-Policy': {
          'http-equiv': 'Content-Security-Policy',
          'content': 'script-src \'self\';'
        }
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Preferences',
      filename: 'preferences.html',
      template: './public/renderer.html',
      chunks: ['preferences'],
      meta: {
        'Content-Security-Policy': {
          'http-equiv': 'Content-Security-Policy',
          'content': 'script-src \'self\';'
        }
      }
    })
  ],
});
