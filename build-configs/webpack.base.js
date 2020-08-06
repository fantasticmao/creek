const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// local barrage server config
const localServer = {
  port: 9000,
  host: '0.0.0.0'
};

module.exports = {
  // support multiple entry points
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
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
    }]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      PROD: process.env.NODE_ENV === 'production',
      DEV: process.env.NODE_ENV === 'development',
      LOCAL_SERVER_PORT: localServer.port,
      LOCAL_SERVER_HOST: localServer.host,
    }),
    new VueLoaderPlugin()
  ]
};
