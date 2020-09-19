import { User, MeetPresence } from '../database/models'
import { parse, set } from 'date-fns'

module.exports = {
  init (cliente) {
    // function to init
    // run before register
  },
  get config () {
    return {
      name: 'meet', // the comand name to call
      type: 'message', // the command event type
      description: 'Cria um meet',
      usage: 'meet <nome-da-reuniao> <nome-do-canal> <dia>/<mes> <hora inicio>-<hora fim>'
    }
  },
  validate (client, message, args) {
    if (args.lenth < 4) { throw new Error('Falta argumentos') }
  },
  async run (client, message, [meetName, channelName, date, time]) {
    const [startTime, entTime] = time.split('-')
    const voiceroom = message.guild.channels.cache.find(channel => channel.name === channelName)
    if (!voiceroom) return message.channel.send('Canal selecionado não existe')

    const getTime = (time) => {
      const [hours, minutes] = time.split(':')
      const newDate = parse(date, 'dd/MM', new Date())
      return set(newDate, { hours, minutes })
    }

    const userFromDb = await User.findOneAndUpdate({
      discord_id: message.author.id
    }, { name: message.author.username }, { upsert: true })

    const meet = await MeetPresence.create({
      name: meetName,
      owner: userFromDb._id,
      voice_channel: {
        id: voiceroom.id,
        name: voiceroom.name
      },
      startTime: getTime(startTime),
      endTime: getTime(entTime)
    })

    return message.channel.send(`Reunião ${meet.name} criada ${message.author.username}!`)
  },
  success (client, message, args) {
    // self descriptive
    // run after run
  },
  fail (err, client, message, args) { // eslint-disable-line handle-callback-err
    return message.channel.send('Ops, deu um erro!')
    // run if have an error on validate, run or success
  },
  after (client, message, args) {
    // self descriptive
    // run after all
  }
}
