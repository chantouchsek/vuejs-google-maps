module.exports = {
  publicPath: './',
  css: { extract: true },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
}
