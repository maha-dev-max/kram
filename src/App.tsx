import { useState } from 'react'
import { AppShell } from './components/layout/AppShell'
import { HabitModal } from './components/habits/HabitModal'
import { useKramData } from './hooks/useKramData'
import { useToast } from './hooks/useToast'
import { localDateKey, streakFor } from './lib'
import { TodayPage } from './features/dashboard/TodayPage'
import { HabitsPage } from './features/habits/HabitsPage'
import { HistoryPage } from './features/history/HistoryPage'
import { InsightsPage } from './features/insights/InsightsPage'
import type { Habit, Page } from './types'
import { Logo } from './components/layout/Logo'

function App() {
  const [page, setPage] = useState<Page>('Today')
  const [modal, setModal] = useState<{ open: boolean; habit?: Habit }>({ open: false })
  const { habits, setHabits, deletedHabits, setDeletedHabits, records, dailyNotes, saveRecord, saveDailyNote } = useKramData()
  const { toast, showToast } = useToast()
  const activeHabits = habits.filter((habit) => habit.active)
  const knownHistoryHabitIds = new Set([...habits, ...deletedHabits].map((habit) => habit.id))
  const orphanedHistoryHabits = records.filter((record, index, allRecords) => !knownHistoryHabitIds.has(record.habitId) && allRecords.findIndex((item) => item.habitId === record.habitId) === index).map((record) => ({ id: record.habitId, name: 'Deleted habit', description: 'Historical record', category: 'Life' as const, frequency: 'Daily' as const, target: '', reminder: '', active: false, color: '#9aa69d' }))
  const historyHabits = [...habits, ...deletedHabits, ...orphanedHistoryHabits]
  const longestStreak = Math.max(...activeHabits.map((habit) => streakFor(habit, records)), 0)

  const handleStatus = (habit: Habit, status: 'completed' | 'skipped') => {
    const reason = status === 'skipped' ? window.prompt('Why are you skipping today? (optional)', '') || '' : undefined
    saveRecord(habit, status, reason)
    showToast(status === 'completed' ? `${habit.name} completed` : `${habit.name} marked as skipped`)
  }

  const saveHabit = (habit: Habit) => {
    setHabits((previous) => modal.habit ? previous.map((item) => item.id === habit.id ? habit : item) : [...previous, habit])
    setModal({ open: false })
    showToast(modal.habit ? 'Habit updated' : 'Habit created')
  }

  const deleteHabit = (id: string) => {
    const deletedHabit = habits.find((habit) => habit.id === id)
    if (deletedHabit) setDeletedHabits((previous) => [...previous.filter((habit) => habit.id !== id), deletedHabit])
    setHabits((previous) => previous.filter((habit) => habit.id !== id))
    setModal({ open: false })
    showToast('Habit removed')
  }

  return <AppShell page={page} onPageChange={setPage} longestStreak={longestStreak}><header className="flex items-center justify-between px-5 py-6 md:px-12 md:py-9"><div className="md:hidden"><Logo /></div><div className="hidden md:block"><p className="text-sm text-[#87958c]">{page === 'Today' ? new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()) : 'Your personal rhythm'}</p><h1 className="mt-1 font-display text-3xl text-[#26372e]">{page}</h1></div><div className="flex items-center gap-3"><button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dce4dc] bg-white text-[#64776a]" aria-label="Notifications">♧</button><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d5e2d7] text-sm font-semibold text-[#476050]">AS</div></div></header><div className="px-5 md:px-12">{page === 'Today' && <TodayPage habits={activeHabits} records={records} note={dailyNotes[localDateKey()] || ''} onNote={(note) => saveDailyNote(localDateKey(), note)} onStatus={handleStatus} onAdd={() => setModal({ open: true })} />}{page === 'Habits' && <HabitsPage habits={habits} onAdd={() => setModal({ open: true })} onEdit={(habit) => setModal({ open: true, habit })} onDelete={deleteHabit} onToggle={(id) => setHabits((previous) => previous.map((habit) => habit.id === id ? { ...habit, active: !habit.active } : habit))} />}{page === 'History' && <HistoryPage habits={historyHabits} records={records} dailyNotes={dailyNotes} />}{page === 'Insights' && <InsightsPage habits={activeHabits} records={records} />}</div>{modal.open && <HabitModal habit={modal.habit} onClose={() => setModal({ open: false })} onSave={saveHabit} />}{toast && <div className="fixed bottom-20 left-1/2 z-30 -translate-x-1/2 rounded-full bg-[#27382e] px-5 py-3 text-sm text-white shadow-xl md:bottom-8">{toast}</div>}</AppShell>
}

export default App
