module.exports = {
  devServer: {
    port: 9988,
    proxy: {
      '/vue': {
        target: 'http://127.0.0.1:9989/',
        changeOrigin: true,
      },
    },
    disableHostCheck: true,
  },
};
