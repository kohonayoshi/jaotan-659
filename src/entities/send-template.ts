import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'
import { DBCategory } from './category.entity'
import { DBRecord } from './record.entity'

@Entity('send-templates')
export class DBSendTemplate extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    comment: 'テンプレートID',
  })
  templateId: number

  @Column({
    type: 'text',
    comment: 'テキスト',
  })
  text: string

  @OneToOne(() => DBCategory, (category) => category.sendTemplate)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'categoryId',
  })
  category: DBCategory

  @CreateDateColumn({
    comment: 'データ登録日時',
  })
  createdAt: Timestamp

  @UpdateDateColumn({
    comment: 'データ更新日時',
  })
  updatedAt: Timestamp

  @ManyToOne(() => DBRecord, (record) => record.category)
  records: DBRecord[]
}
