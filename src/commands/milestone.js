/* eslint-disable camelcase */
import Discord from 'discord.js'
import axios from 'axios'
import { UserRep } from '../database/entity/User'
import { parseISO, isAfter } from 'date-fns'

module.exports = {
  async run (client, message) {
    const oi = await axios.get('https://gitlab.com/api/v4/groups/3340354/issues?state=opened&per_page=100&milestone=any', {
      headers: {
        Authorization: 'Bearer cfM3kpBtA6uFzJXFjh-J'
      }
    })
    for (const data of oi.data) {
      const {
        title, description, web_url, assignees, labels,
        milestone: { title: milestoneTitle, due_date }
      } = data
      if (due_date == null) continue // Pula as issues com Milestone sem data definida
      if (isAfter(parseISO(due_date), Date.now())) continue // Pula as issues com Milestone que ainda não estão atrasadas
      const usernames = []
      for (const assignee of assignees) {
        const { username } = assignee
        const { discord_id } = await UserRep().findOne({ gitlab: username }) || {}
        const quote = `<@${discord_id || username}>`
        usernames.push(quote)
      }
      const embeddedMessage = new Discord.MessageEmbed()
        .setColor('#99cc00')
        .setAuthor(milestoneTitle)
        .setTitle(title)
        .setURL(web_url)
        .setDescription(description ? description.substring(0, 50) + '...' : 'Sem descrição.')
        .addFields(
          { name: 'Assinantes', value: usernames.join(', ') || 'Sem assinantes', inline: true },
          { name: 'Labels', value: labels.join(', ') || 'Sem labels', inline: true }
        )
        .setTimestamp()
      await message.channel.send(embeddedMessage)
    }
  },

  get config () {
    return {
      name: 'milestone',
      description: 'Envia todas as issues das milestones atrasadas',
      usage: '$milestone',
      type: 'message'
    }
  }
}
