import { User, MeetPresence } from '../database/models'
import { isWithinInterval } from 'date-fns'

module.exports = async (client, oldState, newState) => {
  const discordUser = oldState?.member?.user || newState?.member?.user
  const discordChannel = oldState?.channel || newState?.channel
  if (discordUser.bot) return

  const userFromDb = await User.findOneAndUpdate({
    discord_id: discordUser.id
  }, { name: discordUser.username }, { upsert: true })

  const now = new Date()

  const meet = await MeetPresence.findOne({
    startTime: { $lt: now },
    endTime: { $gt: now },
    'voice_channel.id': discordChannel.id
  }).populate('owner')

  if (meet && isWithinInterval(now, { start: meet.startTime, end: meet.endTime })) {
    try {
      await MeetPresence.updateOne({ _id: meet._id }, { $addToSet: { participants: userFromDb._id } })
    } catch {}
  }
}
