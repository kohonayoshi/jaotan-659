import config from 'config'

const configuration: {
  DISCORD_TOKEN: string
  DISCORD_GUILD_ID: string
  DISCORD_CHANNEL_ID: string
  DB_TYPE: 'mysql' | 'sqlite'
  DB_HOSTNAME: string
  DB_PORT: number
  DB_USERNAME: string
  DB_PASSWORD: string
  DB_DATABASE: string
} = {
  DISCORD_TOKEN: config.get('discord.token'),
  DISCORD_GUILD_ID: config.get('discord.guildId'),
  DISCORD_CHANNEL_ID: config.get('discord.channelId'),
  DB_TYPE: config.get('db.type'),
  DB_HOSTNAME: config.get('db.host'),
  DB_PORT: config.get('db.port'),
  DB_USERNAME: config.get('db.user'),
  DB_PASSWORD: config.get('db.password'),
  DB_DATABASE: config.get('db.database'),
}

export default configuration
