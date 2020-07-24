const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['@babel/preset-env']
        }
      },
    }, {
      test: /\.vue$/,
      use: {
        loader: 'vue-loader'
      }
    }]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      PROD: process.env.NODE_ENV === 'production',
      DEV: process.env.NODE_ENV === 'development'
    }),
    new VueLoaderPlugin()
  ]
};
