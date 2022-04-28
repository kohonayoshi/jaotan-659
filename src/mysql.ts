import mysql from 'mysql2/promise'
import { DataSource } from 'typeorm'
import configuration from './configuration'
import { DBCategory } from './entities/category.entity'
import { DBRecord } from './entities/record.entity'
import { DBUser } from './entities/user.entity'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

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

/*
export async function addItem(
  conn: mysql.Connection,
  message: Message,
  timeData: TimeData
): Promise<void> {
  // データ追加
}

export async function isTried(
  conn: mysql.Connection,
  user: User,
  timeData: TimeData
): Promise<void> {
  // 既にデータがあるかどうか、トライ済みか？
}
*/
