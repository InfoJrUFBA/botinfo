module.exports = {
  init (cliente) {
    // function to init
    // run before register
  },
  get command () {
    // configs
    return {
      name: 'troll',
      description: 'Descrição do Comando',
      usage: 'comando',
      type: 'message'
    }
  },
  validate (client, message, args) {
    // self descriptive
    // run before run
  },
  run (client, message, args) {
    // self descriptive
  },
  success (client, message, args) {
    // self descriptive
    // run after run
  },
  fail (err, client, message, args) { // eslint-disable-line handle-callback-err
    // self descriptive
    // run if have an error on validate, run or success
  },
  after (client, message, args) {
    // self descriptive
    // run after all
  }
}
