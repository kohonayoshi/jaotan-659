import { Time, TimeData } from './times'

/**
 * Time に対応する今日の日時を返す
 *
 * @param {Time} time 時間データ
 * @returns {Date} 時間データに対応する今日の日時
 */
export function getTodayDate(time: Time): Date {
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
 * @param TIMES 時間データ群
 * @param text テキスト
 * @param date 投稿日時
 * @param isValid 有効時間のみ取得するか
 * @returns {TimeData | null} 時間データ (該当するものがない場合 null)
 */
export function getTimeData(
  TIMES: TimeData[],
  text: string,
  date: Date,
  isValid: boolean
): TimeData | null {
  const times = TIMES.filter((time) => {
    switch (time.type) {
      case 'EQUAL':
        return text === time.text
      case 'START':
        return text.startsWith(time.text)
      case 'END':
        return text.endsWith(time.text)
      case 'INCLUDE':
        return text.includes(time.text)
      default:
        return false
    }
  }).filter((time) => {
    if (!isValid) return true
    const before = time.start
    const after = time.end
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

/**
 * 時間データと指定日時を比較し、差時間テキストを返す
 *
 * @param timeData 時間データ
 * @param date 指定日時
 * @returns {string} 差時間テキスト
 */
export function getTimeDiffText(timeData: TimeData, date: Date): string {
  const time = getTodayDate(timeData.base)
  const diff = Math.abs(date.getTime() - time.getTime())
  const hour = Math.floor(diff / 1000 / 60 / 60)
  const minute = Math.floor(diff / 1000 / 60) % 60
  const second = Math.floor(diff / 1000) % 60
  const millisecond = Math.floor(diff / 10) % 100
  return `${hour}時間${minute}分${second}秒${millisecond}ミリ秒`
}
