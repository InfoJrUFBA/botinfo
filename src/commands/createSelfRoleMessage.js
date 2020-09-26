import { Collection } from 'discord.js'
import { SelfRole } from '../database/models'
module.exports = {
  init (cliente) {
    // function to init
    // run before register
  },
  get config () {
    return {
      name: 'rolemessage', // the comand name to call
      type: 'message', // the command event type
      description: 'Ele criar uma mensagem de role auto assinavel',
      usage: 'use assim $example'
    }
  },
  validate (client, message, args) {
    this.member = message.guild.members.cache.get(message.author.id)
    if (!this.member.hasPermission('ADMINISTRATOR')) {
      message.channel.send('Você não tem permissão para fazer isso, sorry :3')
      throw new Error()
    }
  },
  async run (client, message, args) {
    const messages = new Collection()
    messages.set(message.id, message)

    while (true) {
      const response = await message.channel.awaitMessages(
        (filterMessage) => filterMessage.author.id === message.author.id,
        { max: 1, time: 30000 }
      ).then(res => res.first())
      if (!response) break

      messages.set(response.id, response)
      if (response.content === 'sair') break
    }

    const permissionsMenssages = messages.array()
      .slice(1, messages.array().length - 1)
      .map(e => e.content
        .split(' ')
        .filter(Boolean)
      )

    const messageText = message.content.split('\n').slice(1).join('\n')
    const sendedMessage = await message.channel.send(messageText)

    const selfRole = new SelfRole({
      message: {
        id: sendedMessage.id,
        content: messageText
      }
    })

    for (const [messageEmoji, messageRole] of permissionsMenssages) {
      const emojiObj = message.guild.emojis.cache.find(e => messageEmoji.includes(e.identifier))
      const role = message.guild.roles.cache.find(e => messageRole.includes(e.id))

      const emoji = emojiObj?.id ?? messageEmoji
      selfRole.roles.push({
        emoji,
        roleId: role.id
      })

      await sendedMessage.react(emoji)
    }

    for (const [, value] of messages) {
      await value.delete().catch(() => {})
    }

    await selfRole.save()
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
