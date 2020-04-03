const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    background: path.join(__dirname, 'src/background/index.ts'),
    popup: path.join(__dirname, 'src/popup/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-inline-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `./src/popup/index.html`,
      filename: 'popup.html',
      chunks: ['popup'],
      inject: true,
    }),
    new CopyWebpackPlugin([
      { from: 'static/*' }
    ])
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      parallel: true,
      terserOptions: {
        mangle: true,
      },
    })]
  }
};
