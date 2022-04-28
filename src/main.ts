import { Client, Intents, Message } from 'discord.js'
import 'reflect-metadata'
import configuration from './configuration'
import { getTimeData, getTimeDiffText } from './lib'
import { AppDataSource } from './mysql'

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

export function getClient() {
  return client
}

client.on('ready', async () => {
  console.log(`ready: ${client.user?.tag}`)
})

client.on('messageCreate', async (message: Message) => {
  if (message.author.id === client.user?.id) return
  if (message.channelId !== configuration.DISCORD_CHANNEL_ID) return
  const timeData = getTimeData(message.content, message.createdAt, true)
  if (timeData) {
    // 有効期間内
    message.reply(getTimeDiffText(timeData, message.createdAt))
    return
  }

  const timeDataNotValid = getTimeData(
    message.content,
    message.createdAt,
    false
  )
  if (!timeDataNotValid) return

  // 有効期間外
  message.reply('有効期間外')
})

;(async () => {
  console.log('Initializing database...')
  await AppDataSource.initialize().catch((error) => console.log(error))
  console.log('Database initialized')

  await client.login(configuration.DISCORD_TOKEN)

  console.log('Login Successful.')
})().catch(console.error)
