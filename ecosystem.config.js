module.exports = {
  apps: [{
    name: 'infobot',
    script: './dist/index.js',
    watch: '.',
    instances: 'max',
    exec_mode: 'cluster'
  }]
}
