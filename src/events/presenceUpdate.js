const utils = require('../utils')
const runCommand = async (client, message) => {
  if (!utils.isCommand(message)) return

  const { args, command } = utils.getComand(message)

  const cmd = client.commands.get(command)
  const isCmdType = utils.hasComandType(cmd, 'presenceUpdate')
  if (!isCmdType) return

  message.delete().catch(() => { })

  console.log(
    '[#LOG]',
    `${message.author.username} (${
    message.author.id
    }) executou o comando: ${cmd.config.name}`
  )
  try {
    if (cmd.validate) {
      await cmd.validate(client, message, args)
    }
    await cmd.run(client, message, args)
    if (cmd.success) {
      await cmd.success(client, message, args)
    }
  } catch (err) {
    console.error(err)
    if (cmd.fail) {
      await cmd.fail(err, client, message, args)
      return
    }
  } finally {
    if (cmd.after) {
      await cmd.after(client, message, args)
    }
  }
}

module.exports = async (client, message) => {
  await Promise.all([
    runCommand(client, message)
  ])
}
