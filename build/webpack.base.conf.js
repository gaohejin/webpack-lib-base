/* global __dirname, require, module */
const path = require('path')
const utils = require('./utils')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}
const config = {
  entry: [
    // './node_modules/babel-polyfill',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        enforce: 'pre',  // 在babel-loader对源码进行编译前进行lint的检查
        loaders: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: /(node_modules|bower_components)/
      },
      // {
      //   test: /\.css$/,
      //   loader:  ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: 'css-loader'
      //   })
      // },
      {
        test: /\.css$/,
        loader:  "style-loader!css-loader"
      },
      {
        test:  /\.scss$/,
        loader:  "style-loader!css-loader!sass-loader"
      },
      {
        test:  /\.less$/,
        loader:  "style-loader!css-loader!less-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.css'],
    alias: {
      '@': resolve('src')
    }
  }
}
module.exports = config
