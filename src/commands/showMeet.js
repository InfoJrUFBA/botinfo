import { MeetPresence } from '../database/models'
import { format } from 'date-fns'
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

    const messageToSend = `
Reunião ${meet.name} criado por ${meet.owner.name}
No canal: ${meet.voice_channel.name}
De ${format(meet.startTime, 'hh:mm')} até ${format(meet.endTime, 'hh:mm')} do dia ${format(meet.startTime, 'dd')} de ${format(meet.startTime, 'MMMM', { locale: ptBR })}
Participantes: ${meet.participants.map(e => e.name).join(', ')}
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
