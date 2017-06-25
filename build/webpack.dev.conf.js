const webpack = require('webpack')
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
let devtool = false
if (config.dev.devtoolSourceMap && typeof config.dev.devtoolSourceMap === 'string') {
  devtool = config.dev.devtoolSourceMap
} else if (config.dev.devtoolSourceMap === true) {
  devtool = '#cheap-module-eval-source-map'
} else {
  devtool = false
}
module.exports = merge(baseWebpackConfig, {
  output: {
    path: config.dev.distDirectory,
    filename: config.dev.libraryName + '.js',
    library: config.dev.libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: devtool,
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    // extract css into its own file
    // new ExtractTextPlugin({
    //   filename: utils.assetsPath('css/[name].css')
    // }),
    // // Compress extracted CSS. We are using this plugin so that possible
    // // duplicated CSS from different components can be deduped.
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: {
    //     safe: true
    //   }
    // }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../asset'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})
