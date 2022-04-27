import { Time, TimeData, TIMES } from './times'

export function getTodayDate(time: Time) {
  const today = new Date()
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    time.hour,
    time.minute,
    time.second,
    time.millisecond
  )
}

/**
 * テキストから時間データを取得する
 *
 * @param text テキスト
 * @param date 投稿日時
 * @param isValid 有効時間のみ取得するか
 * @returns 時間データ
 */
export function getTimeData(
  text: string,
  date: Date,
  isValid: boolean
): TimeData | null {
  const times = TIMES.filter((time) => {
    switch (time.type) {
      case 'equal':
        return text === time.text
      case 'start':
        return text.startsWith(time.text)
      case 'end':
        return text.endsWith(time.text)
      case 'include':
        return text.includes(time.text)
      default:
        return false
    }
  }).filter((time) => {
    if (!isValid) return true
    const before = time.before
    const after = time.after
    return (
      before.hour <= date.getHours() &&
      date.getHours() <= after.hour &&
      before.minute <= date.getMinutes() &&
      date.getMinutes() <= after.minute &&
      before.second <= date.getSeconds() &&
      date.getSeconds() <= after.second &&
      before.millisecond <= date.getMilliseconds() &&
      date.getMilliseconds() <= after.millisecond
    )
  })
  let result = null
  let i = Number.MAX_VALUE
  for (const time of times) {
    const tmp = getTodayDate(time.base)
    const diff = Math.abs(date.getTime() - tmp.getTime())
    if (diff < i) {
      result = time
      i = diff
    }
  }
  // 最も投稿時刻に近い時間データを返す。
  return times.length > 0 ? result : null
}

export function getTimeDiffText(timeData: TimeData, date: Date): string {
  const time = getTodayDate(timeData.base)
  const diff = Math.abs(date.getTime() - time.getTime())
  const hour = Math.floor(diff / 1000 / 60 / 60)
  const minute = Math.floor(diff / 1000 / 60) % 60
  const second = Math.floor(diff / 1000) % 60
  const millisecond = Math.floor(diff / 10) % 100
  return `${hour}時間${minute}分${second}秒${millisecond}ミリ秒`
}
