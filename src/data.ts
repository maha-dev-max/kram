import type { DailyRecord, Habit } from './types'
import { localDateKey } from './lib'

export const categoryColors = { Mind: '#9a9fd0', Body: '#e3a36a', Craft: '#93b8a2', Life: '#d49aa4' } as const

export const initialHabits: Habit[] = [
  { id: 'move', name: 'Move your body', description: 'A little movement counts.', category: 'Body', frequency: 'Daily', target: '30 min', reminder: '07:30', active: true, color: '#e3a36a' },
  { id: 'read', name: 'Read 10 pages', description: 'Stay curious, one page at a time.', category: 'Craft', frequency: 'Daily', target: '10 pages', reminder: '21:00', active: true, color: '#93b8a2' },
  { id: 'journal', name: 'Journal', description: 'Notice what is happening within.', category: 'Mind', frequency: 'Weekdays', target: '5 min', reminder: '08:00', active: true, color: '#9a9fd0' },
  { id: 'water', name: 'Drink 2L water', description: 'Give your body what it needs.', category: 'Body', frequency: 'Daily', target: '2 litres', reminder: '09:00', active: true, color: '#85b9cf' },
]

const today = new Date()

export const initialRecords: DailyRecord[] = [
  { habitId: 'move', date: localDateKey(today), status: 'completed' },
  { habitId: 'read', date: localDateKey(today), status: 'completed' },
  { habitId: 'journal', date: localDateKey(today), status: 'skipped', reason: 'Slow morning' },
  { habitId: 'move', date: localDateKey(new Date(today.getTime() - 86400000)), status: 'completed' },
  { habitId: 'read', date: localDateKey(new Date(today.getTime() - 86400000)), status: 'completed' },
  { habitId: 'journal', date: localDateKey(new Date(today.getTime() - 86400000)), status: 'completed' },
  { habitId: 'water', date: localDateKey(new Date(today.getTime() - 86400000)), status: 'completed' },
]
