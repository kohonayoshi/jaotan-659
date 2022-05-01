import { Column, CreateDateColumn, Entity, OneToMany, Timestamp } from 'typeorm'
import { DBCategory } from './category.entity'
import { DBUser } from './user.entity'

@Entity('records')
export class DBRecord {
  @Column({
    type: 'bigint',
    unsigned: true,
    comment: 'メッセージID',
    primary: true,
    unique: true,
  })
  messageId: number

  @Column({
    type: 'text',
    comment: '生メッセージテキスト',
  })
  rawtext: string

  @OneToMany(() => DBCategory, (category) => category.records)
  category: DBCategory

  @OneToMany(() => DBUser, (user) => user.records)
  user: DBUser

  @Column({
    type: 'int',
    unsigned: true,
    comment: '時間差 (ms)',
  })
  diff: number

  @Column({
    comment: '投稿日時',
    type: 'timestamp',
    precision: 3,
  })
  postedAt: Date

  @CreateDateColumn({
    comment: 'データ登録日時',
  })
  createdAt: Timestamp
}
