// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

// const path = require('path');
const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: process.env.NODE_ENV === 'production'
    ? '/Product-page-responsive/'
    : '/'
});