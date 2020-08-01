import { UserRep } from '../database/entity/User'
import { MeetPresenceRep } from '../database/entity/MeetPresence'
module.exports = async (client, oldState, newState) => {
  const discordUser = oldState?.member?.user || newState?.member?.user
  if (discordUser.bot) return

  if (oldState?.channelID === '693209402987118704' || newState?.channelID === '693209402987118704') {
    const userFromDb = await UserRep().saveOrGet({
      name: discordUser.username,
      discord_id: discordUser.id
    })

    MeetPresenceRep().save({ user: userFromDb, meet: 'ago_01/08/2020' }).catch(() => {})
  }
}
