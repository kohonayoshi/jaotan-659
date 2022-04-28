import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'
import { DBRecord } from './record.entity'

@Entity('users')
export class DBUser {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: 'ユーザID',
  })
  userId: number

  @Column({
    type: 'text',
    comment: 'ユーザー名',
  })
  username: string

  @Column({
    type: 'varchar',
    length: 4,
    comment: '4桁タグ',
  })
  discriminator: string

  @Column({
    type: 'text',
    comment: 'アバター情報',
  })
  avatar: string

  @CreateDateColumn({
    comment: 'データ登録日時',
  })
  createdAt: Timestamp

  @UpdateDateColumn({
    comment: 'データ更新日時',
  })
  updatedAt: Timestamp

  @ManyToOne(() => DBRecord, (record) => record.user)
  records: DBRecord[]
}
