const Discord = require('discord.js')
const fs = require('fs')
require('dotenv').config()
const client = new Discord.Client()

const { token } = require('./config')

client.commands = new Discord.Collection()

async function main () {
  const cmdFiles = fs.readdirSync('./commands/')

  cmdFiles.forEach(f => {
    try {
      const props = require(`./commands/${f}`)
      if (f.split('.').slice(-1)[0] !== 'js') return
      if (props.init) {
        props.init(client)
      }
      client.commands.set(props.config.name, props)
    } catch (e) {
      console.log(`[#ERROR] Impossivel executar comando ${f}: ${e}`)
    }
  })

  const evtFiles = fs.readdirSync('./events/')

  evtFiles.forEach(f => {
    const eventName = f.split('.')[0]
    const event = require(`./events/${f}`)

    client.on(eventName, event.bind(null, client))
  })

  client.login(token)
}

main().catch(console.error)

// client.on('presenceUpdate', event => {
//     console.log('presenceUpdate', event)
//     // aqui
// })
// client.on('voiceStateUpdate', event => {
//     console.log('voiceStateUpdate', event)
//     // e aqui
// })
// client.on('guildMemberSpeaking', event => {
//     console.log('guildMemberSpeaking', event)
//     // e aqui
// })
