const path = require('path')
module.exports = {
  build: {
    env: require('./prod.env'),
    libraryName: 'Lib',
    distDirectory: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: path.resolve(__dirname, '../dist/asset'),
    styleDirectory: path.resolve(__dirname, '../dist/style/css'),
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    libraryName: 'Lib',
    devtoolSourceMap: '#source-map',
    cssSourceMap: false,
    distDirectory: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: path.resolve(__dirname, '../dist/asset'),
    styleDirectory: path.resolve(__dirname, '../dist/style/css')
  }
}
