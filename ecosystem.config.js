module.exports = {
  apps: [{
    name: 'infobot',
    script: './dist/index.js',
    watch: '.',
    instances: '1'
  }]
}
