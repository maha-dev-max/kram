import { useEffect, useState } from 'react'
import { initialHabits, initialRecords } from '../data'
import { localDateKey, upsertRecord } from '../lib'
import type { DailyRecord, Habit } from '../types'

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)

const isHabit = (value: unknown): value is Habit => isObject(value) && typeof value.id === 'string' && typeof value.name === 'string' && typeof value.description === 'string' && typeof value.category === 'string' && typeof value.frequency === 'string' && typeof value.target === 'string' && typeof value.reminder === 'string' && typeof value.active === 'boolean' && typeof value.color === 'string'

const isDailyRecord = (value: unknown): value is DailyRecord => isObject(value) && typeof value.habitId === 'string' && typeof value.date === 'string' && (value.status === 'completed' || value.status === 'skipped') && (value.reason === undefined || typeof value.reason === 'string')

const isDailyNotes = (value: unknown): value is Record<string, string> => isObject(value) && Object.values(value).every((note) => typeof note === 'string')

const readStored = <T>(key: string, fallback: T, isValid: (value: unknown) => value is T): T => {
  const stored = localStorage.getItem(key)
  if (!stored) return fallback
  try {
    const parsed: unknown = JSON.parse(stored)
    return isValid(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export function useKramData() {
  const [habits, setHabits] = useState<Habit[]>(() => readStored('kram-habits', initialHabits, (value): value is Habit[] => Array.isArray(value) && value.every(isHabit)))
  const [deletedHabits, setDeletedHabits] = useState<Habit[]>(() => readStored('kram-deleted-habits', [], (value): value is Habit[] => Array.isArray(value) && value.every(isHabit)))
  const [records, setRecords] = useState<DailyRecord[]>(() => readStored('kram-records', initialRecords, (value): value is DailyRecord[] => Array.isArray(value) && value.every(isDailyRecord)))
  const [dailyNotes, setDailyNotes] = useState<Record<string, string>>(() => readStored('kram-notes', {}, isDailyNotes))

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
