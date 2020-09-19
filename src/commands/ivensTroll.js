module.exports = {
  async run (client, message) {
    await message.delete().catch(() => {})
    message.channel.send('Ivens é troll d+!!!')
  },

  get config () {
    return {
      name: 'ivens',
      description: 'Diz como ivens é troll',
      usage: 'ivens',
      type: 'message'
    }
  }
}
