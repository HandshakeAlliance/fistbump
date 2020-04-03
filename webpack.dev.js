const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './manifest.json',
        force: true,
        transform: content => {
          const transformed = JSON.stringify({
            ...JSON.parse(content),
            "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'"
          }, null, 2);
          return transformed;
        }
      },
    ]),
  ]
});
