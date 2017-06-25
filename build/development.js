const config = require('../config')
const rm = require('rimraf')
const path = require('path')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')

rm(path.join(config.dev.distDirectory, config.dev.styleDirectory, config.dev.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    if (err) throw err
  })
})