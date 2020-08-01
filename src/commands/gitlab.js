import { UserRep } from '../database/entity/User'
module.exports = {
  async run (client, message, args) {
    await message.delete().catch(() => {})
    if (message.author.bot) return
    if (args[0] !== undefined) {
      // Associates gitlab username to discord id if passed as arg
      if (args[0] === '-r') {
        message.channel.send('Desassociando seu gitlab...')
        await UserRep().updateAndGet({
          name: message.author.username,
          discord_id: message.author.id,
          gitlab: null
        })
      } else {
        const find = await UserRep().findOne({ gitlab: args[0] })
        if (find && message.author.id !== find.discord_id) {
          message.channel.send('Usuário de Gitlab já registrado.')
        } else {
          const user = await UserRep().updateAndGet({
            name: message.author.username,
            discord_id: message.author.id,
            gitlab: args[0]
          })
          message.channel.send(`<@${user.discord_id}> definiu o seu usuário do gitlab como @${user.gitlab}`)
        }
      }
    } else {
      // Get gitlab username of a discord user if the command was used wihtout arg
      const find = await UserRep().findOne({ discord_id: message.author.id })
      if (!find || !find.gitlab) {
        message.channel.send('Você ainda não registrou seu Gitlab. Passe seu username do gitlab como argumento.')
      } else {
        const user = await UserRep().saveOrGet({
          name: message.author.username,
          discord_id: message.author.id
        })
        message.channel.send(`<@${user.discord_id}> o seu usuário no gitlab é @${user.gitlab}`)
      }
    }
  },

  get config () {
    return {
      name: 'gitlab',
      description: 'Associa o usuário do gitlab ao discord',
      usage: '$gitlab',
      type: 'message'
    }
  }
}
