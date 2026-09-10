import { useEffect, useState } from 'react'
import { initialHabits, initialRecords } from '../data'
import { localDateKey, upsertRecord } from '../lib'
import type { DailyRecord, Habit } from '../types'

export function useKramData() {
  const [habits, setHabits] = useState<Habit[]>(() => JSON.parse(localStorage.getItem('kram-habits') || 'null') || initialHabits)
  const [deletedHabits, setDeletedHabits] = useState<Habit[]>(() => JSON.parse(localStorage.getItem('kram-deleted-habits') || 'null') || [])
  const [records, setRecords] = useState<DailyRecord[]>(() => JSON.parse(localStorage.getItem('kram-records') || 'null') || initialRecords)
  const [dailyNotes, setDailyNotes] = useState<Record<string, string>>(() => JSON.parse(localStorage.getItem('kram-notes') || 'null') || {})

  useEffect(() => localStorage.setItem('kram-habits', JSON.stringify(habits)), [habits])
  useEffect(() => localStorage.setItem('kram-deleted-habits', JSON.stringify(deletedHabits)), [deletedHabits])
  useEffect(() => localStorage.setItem('kram-records', JSON.stringify(records)), [records])
  useEffect(() => localStorage.setItem('kram-notes', JSON.stringify(dailyNotes)), [dailyNotes])

  const saveRecord = (habit: Habit, status: 'completed' | 'skipped', reason?: string, date = localDateKey()) => {
    setRecords((previous) => upsertRecord(previous, { habitId: habit.id, date, status, reason }))
  }

  const saveDailyNote = (date: string, note: string) => setDailyNotes((previous) => ({ ...previous, [date]: note }))

  return { habits, setHabits, deletedHabits, setDeletedHabits, records, dailyNotes, saveRecord, saveDailyNote }
}
