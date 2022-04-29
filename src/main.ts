import { Client, Intents, Message } from 'discord.js'
import 'reflect-metadata'
import configuration from './configuration'
import { DBCategory } from './entities/category.entity'
import { DBRecord } from './entities/record.entity'
import { getTimeData, getTimeDiffText, getTodayDate } from './lib'
import { addItem, AppDataSource, isTried } from './mysql'
import { getDateText, parseTime, TimeData } from './times'

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})
export let TIMES: TimeData[] = []

export function getClient() {
  return client
}

client.on('ready', async () => {
  console.log(`ready: ${client.user?.tag}`)
})

client.on('messageCreate', async (message: Message) => {
  if (message.author.id === client.user?.id) return
  if (message.channelId !== configuration.DISCORD_CHANNEL_ID) return
  const timeData = getTimeData(TIMES, message.content, message.createdAt, true)
  if (timeData) {
    // 有効期間内
    const dbRecordRepo = AppDataSource.getRepository(DBRecord)
    if (!(await isTried(message.author, timeData.category, dbRecordRepo))) {
      message.reply(getTimeDiffText(timeData, message.createdAt))
      await addItem(
        message,
        timeData.category,
        Math.abs(
          message.createdAt.getTime() - getTodayDate(timeData.base).getTime()
        )
      )
    }
    // 既にトライ済み
  }

  // 有効期間外
  const reply = await message.reply(getDateText(message.createdAt))
  setTimeout(() => {
    reply
      .delete()
      .then(() => null)
      .catch(() => null)
  }, 300000) // 30秒後に削除
})

async function loadTimes() {
  const a = await AppDataSource.getRepository(DBCategory).find()
  TIMES = a.map((x) => {
    return {
      text: x.text,
      type: x.matchType,
      base: parseTime(x.base),
      start: parseTime(x.start),
      end: parseTime(x.end),
      category: x,
    }
  })
  console.log('Loaded times:', TIMES)
}

;(async () => {
  console.log('Initializing database...')
  await AppDataSource.initialize()
  console.log('Database initialized')

  await loadTimes()

  await client.login(configuration.DISCORD_TOKEN)

  console.log('Login Successful.')
})().catch(console.error)
