export type Category = 'Mind' | 'Body' | 'Craft' | 'Life'
export type Frequency = 'Daily' | 'Weekdays' | 'Weekly'
export type RecordStatus = 'completed' | 'skipped' | 'pending'
export type Page = 'Today' | 'Habits' | 'History' | 'Insights'

export type Habit = {
  id: string
  name: string
  description: string
  category: Category
  frequency: Frequency
  target: string
  reminder: string
  active: boolean
  color: string
}

export type DailyRecord = {
  habitId: string
  date: string
  status: Exclude<RecordStatus, 'pending'>
  note?: string
  reason?: string
}
