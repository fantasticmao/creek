const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'development',
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
      chunks: ['barrage']
    }),
    new HtmlWebpackPlugin({
      title: 'Preferences',
      filename: 'preferences.html',
      template: './public/renderer.html',
      chunks: ['preferences']
    })
  ],
  devtool: 'inline-source-map'
});
