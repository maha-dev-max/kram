import { useState } from 'react'
import { HistoryCalendar } from './HistoryCalendar'
import { HistoryDayDetails } from './HistoryDayDetails'
import { localDateKey } from '../../lib'
import type { DailyRecord, Habit } from '../../types'

export function HistoryPage({ habits, records, dailyNotes }: { habits: Habit[]; records: DailyRecord[]; dailyNotes: Record<string, string> }) { const today = new Date(); const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1)); const [selectedDate, setSelectedDate] = useState(localDateKey()); return <div className="animate-in min-w-0 max-w-4xl"><div className="mb-7"><p className="text-sm text-[#87958c]">Look back without judgment.</p><h2 className="mt-2 font-display text-4xl text-[#26372e]">Your history</h2></div><div className="grid min-w-0 gap-6 xl:grid-cols-[1fr_320px]"><HistoryCalendar month={month} selectedDate={selectedDate} habits={habits} records={records} onMonthChange={setMonth} onSelectDate={(date) => { setSelectedDate(date); setMonth(new Date(Number(date.slice(0, 4)), Number(date.slice(5, 7)) - 1, 1)) }} /><HistoryDayDetails date={selectedDate} habits={habits} records={records} note={dailyNotes[selectedDate] || ''} /></div></div> }
