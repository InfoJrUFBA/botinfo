import { MeetPresence } from '../database/models'
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale'

module.exports = {
  init (cliente) {
    // function to init
    // run before register
  },
  get config () {
    return {
      name: 'showmeet', // the comand name to call
      type: 'message', // the command event type
      description: 'Mostra a reuniao',
      usage: 'showMeet <after date>'
    }
  },
  validate (client, message, args) {
    // self descriptive
    // run before run
  },
  async run (client, message, [meetId]) {
    const meet = await MeetPresence.findById(meetId).populate('owner').populate('participants')

    if (!meet) return message.channel.send('Reunião não encontrada')

    const start = utcToZonedTime(meet.startTime, 'America/Sao_Paulo')
    const end = utcToZonedTime(meet.endTime, 'America/Sao_Paulo')

    const messageToSend = `
Reunião ${meet.name} criado por ${meet.owner.name}
No canal: ${meet.voice_channel.name}
De ${format(start, 'hh:mm')} até ${format(end, 'hh:mm')} do dia ${format(start, 'dd')} de ${format(start, 'MMMM', { locale: ptBR })}
Participantes: ${meet.participants.map(e => message.guild.members.cache.get(e.discord_id).nickname).join(', ')}
    `
    return message.channel.send(messageToSend)
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
