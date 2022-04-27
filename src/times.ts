export interface Time {
  hour: number
  minute: number
  second: number
  millisecond: number
}
export interface TimeData {
  text: string
  type: 'equal' | 'start' | 'end' | 'include'
  base: Time
  before: Time
  after: Time
}
export const TIMES: TimeData[] = [
  {
    text: '334',
    type: 'include',
    base: {
      hour: 3,
      minute: 34,
      second: 0,
      millisecond: 0,
    },
    before: {
      hour: 3,
      minute: 34,
      second: 0,
      millisecond: 0,
    },
    after: {
      hour: 3,
      minute: 34,
      second: 59,
      millisecond: 999,
    },
  },
  {
    text: '334',
    type: 'include',
    base: {
      hour: 15,
      minute: 34,
      second: 0,
      millisecond: 0,
    },
    before: {
      hour: 15,
      minute: 34,
      second: 0,
      millisecond: 0,
    },
    after: {
      hour: 15,
      minute: 34,
      second: 59,
      millisecond: 999,
    },
  },
  {
    text: 'ｻﾝｼﾞﾊﾝ!!',
    type: 'include',
    base: {
      hour: 3,
      minute: 30,
      second: 0,
      millisecond: 0,
    },
    before: {
      hour: 3,
      minute: 30,
      second: 0,
      millisecond: 0,
    },
    after: {
      hour: 3,
      minute: 30,
      second: 59,
      millisecond: 999,
    },
  },
  {
    text: 'ｻﾝｼﾞﾊﾝ!!',
    type: 'include',
    base: {
      hour: 15,
      minute: 30,
      second: 0,
      millisecond: 0,
    },
    before: {
      hour: 15,
      minute: 30,
      second: 0,
      millisecond: 0,
    },
    after: {
      hour: 15,
      minute: 30,
      second: 59,
      millisecond: 999,
    },
  },
  {
    text: '659',
    type: 'include',
    base: {
      hour: 6,
      minute: 59,
      second: 59,
      millisecond: 999,
    },
    before: {
      hour: 6,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    after: {
      hour: 6,
      minute: 59,
      second: 59,
      millisecond: 999,
    },
  },
  {
    text: '659',
    type: 'include',
    base: {
      hour: 18,
      minute: 59,
      second: 59,
      millisecond: 999,
    },
    before: {
      hour: 18,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    after: {
      hour: 18,
      minute: 59,
      second: 59,
      millisecond: 999,
    },
  },
  {
    text: '6時59分',
    type: 'include',
    base: {
      hour: 6,
      minute: 59,
      second: 59,
      millisecond: 999,
    },
    before: {
      hour: 6,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    after: {
      hour: 6,
      minute: 59,
      second: 59,
      millisecond: 999,
    },
  },
  {
    text: '6時59分',
    type: 'include',
    base: {
      hour: 18,
      minute: 59,
      second: 59,
      millisecond: 999,
    },
    before: {
      hour: 18,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    after: {
      hour: 18,
      minute: 59,
      second: 59,
      millisecond: 999,
    },
  },
  {
    text: 'ななじ',
    type: 'equal',
    base: {
      hour: 7,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    before: {
      hour: 7,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    after: {
      hour: 7,
      minute: 59,
      second: 59,
      millisecond: 999,
    },
  },
  {
    text: 'ななじすき',
    type: 'equal',
    base: {
      hour: 7,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    before: {
      hour: 7,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    after: {
      hour: 7,
      minute: 0,
      second: 59,
      millisecond: 999,
    },
  },
  {
    text: 'ななじすぎ',
    type: 'equal',
    base: {
      hour: 7,
      minute: 1,
      second: 0,
      millisecond: 0,
    },
    before: {
      hour: 7,
      minute: 1,
      second: 0,
      millisecond: 0,
    },
    after: {
      hour: 7,
      minute: 1,
      second: 59,
      millisecond: 999,
    },
  },
  {
    text: 'ななじすぎすぎ',
    type: 'equal',
    base: {
      hour: 7,
      minute: 2,
      second: 0,
      millisecond: 0,
    },
    before: {
      hour: 7,
      minute: 2,
      second: 0,
      millisecond: 0,
    },
    after: {
      hour: 7,
      minute: 2,
      second: 59,
      millisecond: 999,
    },
  },
  {
    text: 'hoge',
    type: 'include',
    base: {
      hour: 23,
      minute: 47,
      second: 59,
      millisecond: 999,
    },
    before: {
      hour: 23,
      minute: 40,
      second: 0,
      millisecond: 0,
    },
    after: {
      hour: 23,
      minute: 50,
      second: 59,
      millisecond: 999,
    },
  },
]
