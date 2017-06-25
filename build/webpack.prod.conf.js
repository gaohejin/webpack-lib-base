const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.distDirectory,
    filename: config.build.libraryName + '.min.js',
    library: config.build.libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
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

if (config.build.productionGzip) { // Gzip压缩
  var CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) { // 打包结果分析
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
