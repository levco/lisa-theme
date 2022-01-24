const path = require('path');
const pkg = require('./package.json');
const cssNano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, './src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bootstrap-lisa.css'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
          'css-loader', 'postcss-loader'
        ])
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              data: `
/*
 * bootstrap-lisa v${pkg.version}
 * Copyright ${(new Date()).getFullYear()} Lev, Inc.
 */`,
            },
          }
        ])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bootstrap-lisa.css'),
    new ExtractTextPlugin('bootstrap-lisa.min.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/g,
      cssProcessor: cssNano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
};

