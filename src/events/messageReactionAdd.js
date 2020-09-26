import { SelfRole } from '../database/models'

module.exports = async (client, reaction, user) => {
  if (user.bot) return
  if (reaction.partial) {
    try {
      await reaction.fetch()
    } catch (error) {
      console.error('Something went wrong when fetching the message: ', error)
      return
    }
  }

  const selfRole = await SelfRole.findOne({ 'message.id': reaction.message.id })
  const member = reaction.message.guild.members.cache.get(user.id)
  const reactionString = reaction.emoji.id ?? reaction.emoji.name

  const roleId = selfRole.roles.find(e => e.emoji === reactionString)?.roleId
  const role = reaction.message.guild.roles.cache.get(roleId)

  if (role) await member.roles.add(role.id)

  const sendedMessage = await reaction.message.channel.send(`${user.username} agora tem o cargo @${role.name}`)
  setTimeout(() => sendedMessage.delete().catch(() => {}), 3000)
}
