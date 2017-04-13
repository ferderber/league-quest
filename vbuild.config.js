const path = require('path');
const OfflinePlugin = require('offline-plugin');

// this will copy ./static/** to ./dist/**
module.exports = options => ({
  entry: 'src/index.js',
  postcss: [
    // add more postcss plugins here
    // by default we have autoprefixer pre added
  ],
  env: {
    API_URL: process.NODE_ENV === 'production' ? '/api' : '//localhost:3000/api'
  },
  webpack (config) {
    config.resolve.modules.push(path.resolve('src'));
    config.resolve.modules.push(path.resolve('config.js'));
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
