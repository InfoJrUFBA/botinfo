module.exports = {
  async run ({ commands }, message) {
    message.channel.send(
      commands
        .map((value, key) => `${key}: ${value.config.description}`)
        .join('\n')
    )
  },

  get config () {
    return {
      name: 'help',
      description: 'Ajuda sobre comandos e o que fazem',
      usage: 'help',
      type: 'message'
    }
  }
}
