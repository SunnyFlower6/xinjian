const webpack = require('webpack')
  module.exports = {
    chainWebpack: config => {
      config.module
          .rule('iview')
          .test(/iview.src.*?js$/)
          .use('babel')
          .loader('babel-loader')
          .end()
    },
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/aserver': {
        target: 'http://121.36.48.15:21038/',
        // target: 'http://192.168.d31.192:11038'
        ws: true
      }
    }
  }
}
