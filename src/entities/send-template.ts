import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'

@Entity('send-templates')
export class DBSendTemplate extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    comment: 'テンプレートID',
  })
  templateId: number

  @Column({
    type: 'text',
    comment: 'テンプレート名',
  })
  name: string

  @Column({
    type: 'text',
    comment: 'テキスト',
  })
  text: string

  @Column({
    type: 'text',
    comment: 'スケジュール（CRON形式）',
  })
  cron: string

  @CreateDateColumn({
    comment: 'データ登録日時',
  })
  createdAt: Timestamp

  @UpdateDateColumn({
    comment: 'データ更新日時',
  })
  updatedAt: Timestamp
}
