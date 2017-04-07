const path = require('path');
const OfflinePlugin = require('offline-plugin');

// this will copy ./static/** to ./dist/**
module.exports = options => ({
  entry: 'src/index.js',
  postcss: [
    // add more postcss plugins here
    // by default we have autoprefixer pre added
  ],
  webpack (config) {
    config.resolve.modules.push(path.resolve('src'));

    // inject offline-plugin in production build
    if (!options.dev) {
      config.plugins.push(new OfflinePlugin({
        ServiceWorker: {
          events: true
        }
      }));
    }

    return config;
  }
});
