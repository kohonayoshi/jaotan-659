import { Message, User } from 'discord.js'
import mysql from 'mysql2/promise'
import { DataSource, Repository } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import configuration from './configuration'
import { DBCategory } from './entities/category.entity'
import { DBRecord } from './entities/record.entity'
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
  entities: [DBUser, DBRecord, DBCategory],
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
): Promise<void> {
  // データ追加
  const user = new DBUser()
  user.userId = Number(message.author.id)
  user.username = message.author.username
  user.discriminator = message.author.discriminator
  user.avatarUrl = message.author.avatarURL()

  const record = new DBRecord()
  record.messageId = Number(message.id)
  record.rawtext = message.content
  record.category = category
  record.user = user
  record.diff = diff
  record.postedAt = message.createdAt

  await AppDataSource.getRepository(DBRecord).save(record)
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
