const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    backgroundScript: path.join(__dirname, 'src/background-script/index.js'), 
    popup: path.join(__dirname, 'src/popup/index.js'), 
    options: path.join(__dirname, 'src/options/index.js'),
    contentScript: path.join(__dirname, 'src/content-script/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `./src/popup/index.html`,
      filename: 'popup.html',
      chunks: ['popup'],
      inject: true,
    }),
    new HtmlWebPackPlugin({
      template: `./src/options/index.html`,
      filename: 'options.html',
      chunks: ['options'],
      inject: true,
    }),
    new CopyWebpackPlugin([
      'manifest.json', 
      { from: 'static', to: 'static' },
    ]),
  ]
};