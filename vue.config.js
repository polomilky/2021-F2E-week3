module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/2021-F2E-week3/'
    : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
