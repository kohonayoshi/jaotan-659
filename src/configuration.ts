import config from 'config'

const configuration: {
  DISCORD_TOKEN: string
  DISCORD_CHANNEL_ID: string
} = {
  DISCORD_TOKEN: config.get('discord.token'),
  DISCORD_CHANNEL_ID: config.get('discord.channelId'),
}

export default configuration
