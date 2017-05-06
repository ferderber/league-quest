const path = require('path');
module.exports = options => ({
  entry: 'src/index.js',
  postcss: [],
  env: {
    API_URL: process.env.NODE_ENV === 'production' ? '/api' : '//localhost:3000/api'
  },
  webpack (config) {
    config.resolve.modules.push(path.resolve('src'));
    config.resolve.modules.push(path.resolve('config.js'));
    return config;
  }
});
