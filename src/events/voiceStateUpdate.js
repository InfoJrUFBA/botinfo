import { UserRep } from '../database/entity/User'
module.exports = async (client, oldState, newState) => {
  // console.log({ oldState, newState })
  const discordUser = oldState?.member?.user || newState?.member?.user
  if (discordUser.bot) return

  if (oldState?.channelID === '693209402987118704' || newState?.channelID === '693209402987118704') {
    await UserRep().saveOrGet({
      name: discordUser.username,
      discord_id: discordUser.id
    })
  }
}
