import { UserRep } from '../database/entity/User'

module.exports = {
  get config () {
    return {
      name: 'ago', // the comand name to call
      type: 'message', // the command event type
      description: 'Lista a table users que tem as pessoas que entraram na sala da AGO apartir do dia 4',
      usage: 'use assim $ago'
    }
  },
  async run (client, message, args) {
    const [users, count] = await UserRep().findAndCount()
    message.channel.send(`${users.map(user => `name: ${user.name}`).join('\n')} \n total: ${count}`)
  }
}
