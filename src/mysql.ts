import { Message, User } from 'discord.js'
import mysql from 'mysql2/promise'
import { DataSource, Repository } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import configuration from './configuration'
import { DBCategory } from './entities/category.entity'
import { DBRecord } from './entities/record.entity'
import { DBSendTemplate } from './entities/send-template'
import { DBUser } from './entities/user.entity'

export const AppDataSource = new DataSource({
  type: configuration.DB_TYPE,
  host: configuration.DB_HOSTNAME,
  port: configuration.DB_PORT,
  username: configuration.DB_USERNAME,
  password: configuration.DB_PASSWORD,
  database: configuration.DB_DATABASE,
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
  namingStrategy: new SnakeNamingStrategy(),
  entities: [DBUser, DBRecord, DBCategory, DBSendTemplate],
  subscribers: [],
  migrations: [],
  timezone: '+09:00',
  supportBigNumbers: true,
  bigNumberStrings: true,
})

export async function getDBConnection(): Promise<mysql.Connection | null> {
  try {
    const connection = await mysql.createConnection({
      host: configuration.DB_HOSTNAME,
      port: configuration.DB_PORT,
      user: configuration.DB_USERNAME,
      password: configuration.DB_PASSWORD,
      database: configuration.DB_DATABASE,
      timezone: '+09:00',
      supportBigNumbers: true,
      bigNumberStrings: true,
    })
    await connection.beginTransaction()

    return connection
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function addItem(
  message: Message,
  category: DBCategory,
  diff: number
): Promise<DBRecord> {
  console.log(`addItem: ${message.author.tag} ${category.name} ${diff}`)
  // データ追加
  let user
  const dbUser = await DBUser.findOne({
    where: {
      userId: Number(message.author.id),
    },
  })
  if (dbUser) {
    user = dbUser
  } else {
    const newUser = new DBUser()
    newUser.userId = Number(message.author.id)
    newUser.username = message.author.username
    newUser.discriminator = message.author.discriminator
    newUser.avatarUrl = message.author.avatarURL()
    user = await newUser.save()
  }

  const record = new DBRecord()
  record.messageId = Number(message.id)
  record.rawtext = message.content
  record.category = category
  record.user = user
  record.diff = diff
  record.postedAt = message.createdAt
  return await record.save()
}

export async function isTried(
  user: User,
  category: DBCategory,
  dbRecordRepo: Repository<DBRecord>
): Promise<boolean> {
  // 既にデータがあるかどうか、トライ済みか？
  const dbRecord = await dbRecordRepo.findOne({
    where: {
      user: {
        userId: Number(user.id),
      },
      category: {
        categoryId: Number(category.categoryId),
      },
    },
  })
  return !!dbRecord
}

export async function calcRank(record: DBRecord) {
  const records = await DBRecord.find({
    order: {
      diff: 'ASC',
    },
  })
  return records.filter((r) => r.diff < record.diff).length + 1
}
