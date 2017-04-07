
const config = {
  dev: {
    hostname: 'http://localhost:3000/api'
  },
  production: {
    hostname: process.env.HOSTNAME
  }
};
export default config[process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'];
