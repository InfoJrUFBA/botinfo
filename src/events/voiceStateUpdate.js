/* eslint-disable no-unused-vars */
// import { User, MeetPresence } from '../database/models'
// import { isWithinInterval } from 'date-fns'
// import { Client } from 'discord.js'

import { Client, VoiceState } from 'discord.js'

/**
 *
 * @param {Client} client
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 * @returns
 */
module.exports = async (client, oldState, newState) => {
  const discordUser = oldState?.member || newState?.member
  const channel = client.channels.cache.get('824443233983397899')

  if (discordUser.bot) return

  if (oldState.channelID === '693209402987118704') {
    channel.send(`Usuario \`${discordUser.displayName}\` (${discordUser}) saiu no canal ${oldState.channel}`)
  }

  if (newState.channelID === '693209402987118704') {
    channel.send(`Usuario \`${discordUser.displayName}\` (${discordUser}) entrou no canal ${newState.channel}`)
  }
}
