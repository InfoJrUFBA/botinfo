module.exports = {
  apps : [{
    name: "infobot",
    script: './index.js',
    watch: '.',
    instances : "max",
    exec_mode : "cluster"
  }],
};
