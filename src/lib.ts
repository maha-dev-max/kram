import type { DailyRecord, Habit, RecordStatus } from './types'

export const localDateKey = (date = new Date()) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const dateFromKey = (key: string) => {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const todayKey = localDateKey
export const formatDate = (date = new Date()) => new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(date)
export const shortDate = (date: Date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date)
export const getStatus = (habitId: string, date: string, records: DailyRecord[]): RecordStatus => records.find((r) => r.habitId === habitId && r.date === date)?.status ?? 'pending'
export const upsertRecord = (records: DailyRecord[], record: DailyRecord) => [...records.filter((r) => !(r.habitId === record.habitId && r.date === record.date)), record]
export const completionPercent = (habits: Habit[], records: DailyRecord[], date = todayKey()) => {
  if (!habits.length) return 0
  return Math.round((habits.filter((h) => getStatus(h.id, date, records) === 'completed').length / habits.length) * 100)
}
export const streakFor = (habit: Habit, records: DailyRecord[], endDate = localDateKey()) => {
  let streak = 0
  const cursor = dateFromKey(endDate)
  while (getStatus(habit.id, localDateKey(cursor), records) === 'completed') {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export const completionPercentForDate = (habits: Habit[], records: DailyRecord[], date: string) => completionPercent(habits, records, date)

export const completionPercentForMonth = (habits: Habit[], records: DailyRecord[], month: Date) => {
  if (!habits.length) return 0
  const today = new Date()
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const endDay = month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth() ? today.getDate() : lastDay
  let completed = 0
  let possible = 0
  for (let day = 1; day <= endDay; day += 1) {
    const key = localDateKey(new Date(month.getFullYear(), month.getMonth(), day))
    completed += habits.filter((habit) => getStatus(habit.id, key, records) === 'completed').length
    possible += habits.length
  }
  return possible ? Math.round((completed / possible) * 100) : 0
}

export const datesForLastDays = (count: number, from = new Date()) => Array.from({ length: count }, (_, index) => {
  const date = new Date(from)
  date.setDate(from.getDate() - (count - 1 - index))
  return date
})
