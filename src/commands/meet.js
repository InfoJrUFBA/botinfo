module.exports = {
  init (cliente) {
    // function to init
    // run before register
  },
  get config () {
    return {
      name: 'meet', // the comand name to call
      type: 'message', // the command event type
      description: 'Descrição do Comando',
      usage: '!meet <nome-do-canal> <começo>-<fim>'
    }
  },
  validate (client, message, args) {
    // self descriptive
    // run before run
  },
  async run (client, message, args) {
    // self descriptive
    const [channelName, time] = args
    const [startTime, endTime] = time.split('-')
    const voiceroom = client.channels.cache.find(channel => channel.name === channelName);
    let members = [];
    for (let member of voiceroom.members){
      members.push(`<@${member[0]}>`)
    }
    const mensagem = `
      Horário: ${startTime}\nMembros: ${members.join(', ')}
      `;
    return message.channel.send(mensagem);
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
