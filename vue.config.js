const { defineConfig } = require('@vue/cli-service')
const ENV = process.env.NODE_ENV;
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    // https:true,
    port: 6103,
    client: {
      webSocketURL: 'ws://0.0.0.0:6103/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  publicPath: ENV === "development" ? "" : "./",
  lintOnSave: false
})


