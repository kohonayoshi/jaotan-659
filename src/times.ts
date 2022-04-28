import { DBCategory } from "./entities/category.entity"

export interface Time {
  hour: number
  minute: number
  second: number
  millisecond: number
}
export interface TimeData {
  text: string
  type: 'EQUAL' | 'START' | 'END' | 'INCLUDE'
  base: Time
  start: Time
  end: Time
  category: DBCategory
}

export function parseTime(text: string) {
  const items = text.split(':')
  const hour = parseInt(items[0], 10)
  const minute = parseInt(items[1], 10)
  const temp = items[2].split('.')
  const second = parseInt(temp[0], 10)
  const millisecond = parseInt(temp[1], 10)
  return {
    hour,
    minute,
    second,
    millisecond,
  }
}

export function getDateText(date: Date) {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
}
