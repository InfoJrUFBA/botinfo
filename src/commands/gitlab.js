import { UserRep } from '../database/entity/User';
module.exports = {
  async run (client, message, args) {
    await message.delete().catch(() => {})
    let mensagem = ''
    if(args[0] != undefined){
      //Associates gitlab username to discord id if passed as arg
      const user = await UserRep().updateAndGet({
        name: message.author.username,
        discord_id: message.author.id,
        gitlab: args[0]
      })
      mensagem = `<@${user.discord_id}> definiu o seu usuário do gitlab como @${user.gitlab}`
    } else {
      //Get gitlab username of a discord user if the command was used wihtout arg
      const user = await UserRep().saveOrGet({
        name: message.author.username,
        discord_id: message.author.id,
      })
      mensagem = `<@${user.discord_id}> o seu usuário no gitlab é @${user.gitlab}`
    }
    message.channel.send(mensagem)
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
