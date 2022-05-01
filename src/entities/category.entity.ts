import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'
import { DBRecord } from './record.entity'

@Entity('categories')
export class DBCategory extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    comment: 'カテゴリID',
  })
  categoryId: number

  @Column({
    type: 'text',
    comment: 'テキスト',
  })
  text: string

  @Column({
    type: 'text',
    comment: '部門名',
  })
  name: string

  @Column({
    type: 'text',
    comment: '説明',
  })
  description: string

  @Column({
    type: 'enum',
    enum: ['EQUAL', 'START', 'END', 'INCLUDE'],
    comment: 'マッチ種別',
  })
  matchType: 'EQUAL' | 'START' | 'END' | 'INCLUDE'

  @Column({
    type: 'varchar',
    length: 12, // 00:00:00.000
    comment: '基準時刻',
  })
  base: string

  @Column({
    type: 'varchar',
    length: 12, // 00:00:00.000
    comment: '対象開始日時',
  })
  start: string

  @Column({
    type: 'varchar',
    length: 12, // 00:00:00.000
    comment: '対象終了日時',
  })
  end: string

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
