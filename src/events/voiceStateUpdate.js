/* eslint-disable no-unused-vars */
// import { User, MeetPresence } from '../database/models'
// import { isWithinInterval } from 'date-fns'
// import { Client } from 'discord.js'

import { Channel, Client, VoiceState } from 'discord.js'

/**
 *
 * @param {Client} client
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 * @returns
 */
module.exports = async (client, oldState, newState) => {
  const discordUser = oldState?.member?.user || newState?.member?.user
  const channel = client.channels.cache.get('824443233983397899')

  if (discordUser.bot) return

  if (oldState?.channel) {
    channel.send(`Usuario \`${discordUser.username}\` saiu no canal ${oldState.channel}`)
  }

  if (newState?.channel) {
    channel.send(`Usuario \`${discordUser.username}\` entrou no canal ${newState.channel}`)
  }
}
// const userFromDb = await User.findOneAndUpdate({
//   discord_id: discordUser.id
// }, { name: discordUser.username }, { upsert: true })

// const now = new Date()

// const meet = await MeetPresence.findOne({
//   startTime: { $lt: now },
//   endTime: { $gt: now },
//   'voice_channel.id': discordChannel.id
// }).populate('owner')

// if (meet && isWithinInterval(now, { start: meet.startTime, end: meet.endTime })) {
//   try {
//     await MeetPresence.updateOne({ _id: meet._id }, { $addToSet: { participants: userFromDb._id } })
//   } catch {}
// }
