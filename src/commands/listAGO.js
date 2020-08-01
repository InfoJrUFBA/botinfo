import { MeetPresenceRep } from '../database/entity/MeetPresence'

module.exports = {
  get config () {
    return {
      name: 'ago',
      description: 'poxaa',
      usage: '$ago',
      type: 'message'
    }
  },
  async run (client, message, args) {
    const [meetPresences, count] = await MeetPresenceRep().findAndCount({ relations: ['user'] })

    const users = meetPresences.map(presence => presence.user)
    message.channel.send(`${users.map(user => `name: ${user.name}`).join('\n')} \n total: ${count}`)
  }
}
