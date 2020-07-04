// import moment from 'moment'
// // import { UserRep } from '../database/entity/User'
// import { StatusTimeRep } from '../database/entity/StatusTime'

module.exports = async (client, oldPresence, newPresence) => {
  // const discordUser = oldPresence?.user || await client.users.fetch(oldPresence?.userID ?? newPresence?.userID)
  // if (discordUser.bot) return

  // const user = await UserRep().saveOrGet({
  //   name: discordUser.username,
  //   discord_id: discordUser.id
  // })

  // if (oldPresence?.status !== newPresence?.status) {
  //   const [statusHistory] = await StatusTimeRep().find({ where: { user }, order: { updatedDate: 'DESC' }, take: 1 })
  //   if (statusHistory && statusHistory.end === null) {
  //     StatusTimeRep().update(statusHistory.id, { end: moment().toDate() })
  //   }
  //   StatusTimeRep().save({
  //     user,
  //     status: newPresence.status,
  //     start: moment().toDate()
  //   })
  // }
}

// eslint-disable-next-line no-unused-vars
// async function runCommand (client, oldPresence, newPresence) {
//   const cmd = client.commands.filter(e => e.config.type === 'presenceUpdate').map(async command => {
//     try {
//       if (cmd.validate) {
//         await cmd.validate(client, oldPresence, newPresence)
//       }
//       await cmd.run(client, oldPresence, newPresence)
//       if (cmd.success) {
//         await cmd.success(client, oldPresence, newPresence)
//       }
//     } catch (err) {
//       console.error(err)
//       if (cmd.fail) {
//         await cmd.fail(err, client, oldPresence, newPresence)
//         return
//       }
//     } finally {
//       if (cmd.after) {
//         await cmd.after(client, oldPresence, newPresence)
//       }
//     }
//   })
// }

// module.exports = async (client, oldPresence, newPresence) => {
//   await Promise.all(runCommand(client, oldPresence, newPresence))
// }
