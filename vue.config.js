module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-google-map/'
    : '/',
  css: { extract: true },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
}
