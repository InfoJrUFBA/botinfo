/* eslint-disable camelcase */
import axios from 'axios'
import { UserRep } from '../database/entity/User'
module.exports = {
  async run (client, message) {
    if (message.author.bot) return

    const { gitlab: gitlabUser } = await UserRep().findOne({ discord_id: message.author.id }) || {}

    if (!gitlabUser) {
      message.channel.send('Usuário sem gitlab')
      return
    }

    const { data: [{ id: gitlabID, avatar_url, web_url, username } = {}] } = await axios.get(`https://gitlab.com/api/v4/groups/3340354/members?query=${gitlabUser}`, {
      headers: {
        Authorization: 'Bearer cfM3kpBtA6uFzJXFjh-J'
      }
    })

    if (!gitlabID) {
      message.channel.send(`@${gitlabUser} não encontrado no grupo da InfoJR`)
      return
    }
    const { data } = await axios.get(`https://gitlab.com/api/v4/groups/3340354/issues?assignee_id=${gitlabID}&&state=opened`, {
      headers: {
        Authorization: 'Bearer cfM3kpBtA6uFzJXFjh-J'
      }
    })

    const embeddedMessage = {
      color: '#99cc00',
      title: `Issues de ${message.guild ? message.guild.member(message.author).nickname || message.author.username : message.author.username}`,
      url: web_url,
      author: {
        name: `Gitlab @${username}`,
        icon_url: avatar_url
      },
      thumbnail: {
        url: message.author.avatarURL()
      },
      fields: []
    }
    for (const [index, value] of data.entries()) {
      const { title, web_url } = value
      const field = {
        name: `Issue nº${index + 1}`,
        value: `[${title}](${web_url})`
      }
      embeddedMessage.fields.push(field)
      console.log(index)
    }
    await message.channel.send({ embed: embeddedMessage })
  },

  get config () {
    return {
      name: 'myissues',
      description: 'Envia todas as issues abertas de um usuário',
      usage: 'myissues',
      type: 'message'
    }
  }
}
