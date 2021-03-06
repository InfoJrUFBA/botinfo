import 'dotenv/config'
import Discord from 'discord.js'
import { readdirSync } from 'fs'
import { resolve } from 'path'
import { createConnection } from 'typeorm'
import mongoose from 'mongoose'
import { token, mongoUrl } from './config'

const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] })
client.commands = new Discord.Collection()

async function main () {
  await createConnection()
  await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

  const cmdFiles = readdirSync(resolve(__dirname, 'commands'))

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

  const evtFiles = readdirSync(resolve(__dirname, 'events'))

  evtFiles.forEach(f => {
    const eventName = f.split('.')[0]
    const event = require(`./events/${f}`)

    client.on(eventName, event.bind(null, client))
  })

  await client.login(token)
  console.log('bot started')
}

main().catch(console.error)
