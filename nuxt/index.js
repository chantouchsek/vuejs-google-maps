const { resolve } = require('path');

module.exports = function nuxtGoogleMapsModule(moduleOptions) {
    const options = Object.assign({}, this.options.googleMaps, moduleOptions);
    // Register plugin
    this.addPlugin({
        src: resolve(__dirname, 'plugin.template.js'),
        fileName: 'google-maps.js',
        options
    })
};


// required by nuxt
module.exports.meta = require('../package.json');
