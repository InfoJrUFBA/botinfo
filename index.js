const Discord = require('discord.js')
const fs = require('fs')
require('dotenv').config()
const client = new Discord.Client()

const { token } = require('./src/config')

client.commands = new Discord.Collection()

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
async function main () {
  const cmdFiles = fs.readdirSync('src/commands/')

  cmdFiles.forEach(f => {
    try {
      const props = require(`./commands/${f}`)
      if (f.split('.').slice(-1)[0] !== 'js') return
      if (props.init) {
        props.init(client)
      }
      client.commands.set(props.command.name, props)
    } catch (e) {
      console.log(`[#ERROR] Impossivel executar comando ${f}: ${e}`)
    }
  })

  const evtFiles = fs.readdirSync('src/events/')

  evtFiles.forEach(f => {
    const eventName = f.split('.')[0]
    const event = require(`./events/${f}`)

    client.on(eventName, event.bind(null, client))
  })

  client.login(token)
}

main().catch(console.error)

//  console.log(client.actions);

/*
presenceUpdate Presence {
  userID: '410908719883354113',
  guild: Guild {
    members: GuildMemberManager {
      cacheType: [Function: Co\\\\\\\\\\\\\\\\\\\\\\llection],
      cache: [Collection [Map]],
      guild: [Circular]
    },
    channels: GuildChannelManager {
      cacheType: [Function: Collection],
      cache: [Collection [Map]],
      guild: [Circular]
    },
    roles: RoleManager {
      cacheType: [Function: Collection],
      cache: [Collection [Map]],
      guild: [Circular]
    },
    presences: PresenceManager {
      cacheType: [Function: Collection],
      cache: [Collection [Map]]
    },
    voiceStates: VoiceStateManager {
      cacheType: [Function: Collection],
      cache: [Collection [Map]],
      guild: [Circular]
    },
    deleted: false,
    available: true,
    id: '690314911359696977',
    shardID: 0,
    name: 'InfoJR UFBA',
    icon: '53fa716f8cf127c49f48673d1d24997f',
    splash: null,
    region: 'brazil',
    memberCount: 20,
    large: false,
    features: [],
    applicationID: null,
    afkTimeout: 300,
    afkChannelID: null,
    systemChannelID: null,
    embedEnabled: undefined,
    premiumTier: 0,
    premiumSubscriptionCount: 0,
    verificationLevel: 'NONE',
    explicitContentFilter: 'MEMBERS_WITHOUT_ROLES',
    mfaLevel: 0,
    joinedTimestamp: 1584751335445,
    defaultMessageNotifications: 'ALL',
    systemChannelFlags: SystemChannelFlags { bitfield: 0 },
    vanityURLCode: null,
    description: null,
    banner: null,
    rulesChannelID: null,
    publicUpdatesChannelID: null,
    ownerID: '247018221398392832',
    emojis: GuildEmojiManager {
      cacheType: [Function: Collection],
      cache: Collection [Map] {},
      guild: [Circular]
    }
  },
  status: 'online',
  activities: [
    Activity {
      name: 'League of Legends',
      type: 'PLAYING',
      url: null,
      details: "Summoner's Rift (Ranqueadas)",
      state: 'Na Seleção de Campeões',
      applicationID: '401518684763586560',
      timestamps: null,
      party: null,
      assets: [RichPresenceAssets],
      syncID: undefined,
      flags: [ActivityFlags],
      emoji: null,
      createdTimestamp: 1585270495108
    }
  ],
  clientStatus: { desktop: 'online' }
}
*/

/*
voiceStateUpdate VoiceState {
  guild: Guild {
    members: GuildMemberManager {
      cacheType: [Function: Collection],
      cache: [Collection [Map]],
      guild: [Circular]
    },
    channels: GuildChannelManager {
      cacheType: [Function: Collection],
      cache: [Collection [Map]],
      guild: [Circular]
    },
    roles: RoleManager {
      cacheType: [Function: Collection],
      cache: [Collection [Map]],
      guild: [Circular]
    },
    presences: PresenceManager {
      cacheType: [Function: Collection],
      cache: [Collection [Map]]
    },
    voiceStates: VoiceStateManager {
      cacheType: [Function: Collection],
      cache: [Collection [Map]],
      guild: [Circular]
    },
    deleted: false,
    available: true,
    id: '690314911359696977',
    shardID: 0,
    name: 'InfoJR UFBA',
    icon: '53fa716f8cf127c49f48673d1d24997f',
    splash: null,
    region: 'brazil',
    memberCount: 20,
    large: false,
    features: [],
    applicationID: null,
    afkTimeout: 300,
    afkChannelID: null,
    systemChannelID: null,
    embedEnabled: undefined,
    premiumTier: 0,
    premiumSubscriptionCount: 0,
    verificationLevel: 'NONE',
    explicitContentFilter: 'MEMBERS_WITHOUT_ROLES',
    mfaLevel: 0,
    joinedTimestamp: 1584751335445,
    defaultMessageNotifications: 'ALL',
    systemChannelFlags: SystemChannelFlags { bitfield: 0 },
    vanityURLCode: null,
    description: null,
    banner: null,
    rulesChannelID: null,
    publicUpdatesChannelID: null,
    ownerID: '247018221398392832',
    emojis: GuildEmojiManager {
      cacheType: [Function: Collection],
      cache: Collection [Map] {},
      guild: [Circular]
    }
  },
  id: '234708335385903104',
  serverDeaf: false,
  serverMute: false,
  selfDeaf: false,
  selfMute: false,
  sessionID: '1813d43920b41aaa3fab661edd8cc1f9',
  streaming: false,
  channelID: '692882014604623932'
}
*/
