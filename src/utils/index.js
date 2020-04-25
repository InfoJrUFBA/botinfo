module.exports = {
  isCommand: message => 'content' in message && typeof message.content === 'string' && message.content.startsWith(process.env.COMMAND_PREFIX),
  getComand (message) {
    const args = message.content
      .slice(process.env.COMMAND_PREFIX.length)
      .trim()
      .split(/ +/g)

    const command = args.shift().toLowerCase()
    return { args, command }
  },
  /**
   *
   * @param {{ command { type : string | string[]}}} command
   * @param {string} type
   * @returns {boolean}
   */
  hasComandType (command, type) {
    if (!command) return false
    const comandType = command.config.type
    return Array.isArray(comandType) ? comandType.includes(type) : comandType === type
  }
}
