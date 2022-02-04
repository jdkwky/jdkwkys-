var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  devServer: {
    port: 9989,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  },
  publicPath: 'http://127.0.0.1:9989',
  configureWebpack: {
    mode: 'development',
    output: {
      library: 'testVue',
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_testVue`
    },
    plugins: [
      new StatsPlugin('asset-stats.json', {
        chunkModules: true,
        exclude: [/node_modules/],
      }),
    ],
  },
};
