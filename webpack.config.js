const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // Mode: development or production
  mode: 'development',
  // Entry point
  entry: './javascript/index.js',
  // Output configuration
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Development server configuration
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000, // You can choose any port
    open: true, // Open the browser after server has been started
    hot: true, // Enable hot module replacement
  },
  // Add more configurations like loaders here
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // new webpack.DefinePlugin({
    //     'process.env': JSON.stringify(process.env)
    //   }),
    new Dotenv()
  ]
};