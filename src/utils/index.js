module.exports = {
  isCommand: message => message.content.startsWith(process.env.COMMAND_PREFIX),
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
    return Array.isArray(command.type) ? command.type.includes(type) : command.type === type
  }
}
