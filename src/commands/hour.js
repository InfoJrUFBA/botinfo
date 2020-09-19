import { formatISO } from 'date-fns'

module.exports = {
  async run (client, message) {
    return message.channel.send(formatISO(new Date()))
  },

  get config () {
    return {
      name: 'hour',
      description: 'printa a hora no servidor',
      usage: 'hour',
      type: 'message'
    }
  }
}
