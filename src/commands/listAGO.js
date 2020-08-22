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
    message.channel.send(`${users.map(user => `name: ${client.users.cache.get(`${user.discord_id}`).username}`).join('\n')} \n total: ${count}`)
  }
}
