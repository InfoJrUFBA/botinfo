module.exports = {
  async run (client, message) {

  },

  get command () {
    return {
      name: 'troll',
      // category: categories.USER,
      description: 'Descrição do Comando',
      usage: 'comando',
      type: 'message'
    }
  }
}
