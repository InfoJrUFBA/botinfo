module.exports = {
  init (cliente) {
    // function to init
    // run before register
  },
  get config () {
    return {
      name: 'domingolegal', // the comand name to call
      type: 'message', // the command event type
      description: 'Marca aleatoriamente alguem para precificar uma proposta',
      usage: 'use assim $domingoLegal'
    }
  },
  validate (client, message, args) {
    // self descriptive
    // run before run
  },
  run (client, message, args) {
      const coordenadoresRoleId = "800165455871606795"
      const coordenadoresRole = message.guild.roles.cache.get(coordenadoresRoleId)
      const coordenadores = coordenadoresRole.members
      const coordenadorSorteado = coordenadores.random()
      message.channel.send(
        `Olaa ${coordenadorSorteado}, faça a precificação de proposta acima e avise aqui no chat quando terminar!!`
      )
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
