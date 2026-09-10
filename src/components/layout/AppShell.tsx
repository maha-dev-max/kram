import type { ReactNode } from 'react'
import type { Page } from '../../types'
import { Logo } from './Logo'
import { Navigation } from './Navigation'

export function AppShell({ page, onPageChange, children, longestStreak }: { page: Page; onPageChange: (page: Page) => void; children: ReactNode; longestStreak: number }) { return <div className="min-h-screen grain bg-[#f7f8f5]"><div className="mx-auto flex min-h-screen max-w-[1440px]"><aside className="hidden w-[244px] shrink-0 flex-col border-r border-[#dfe5df] bg-[#f4f6f2] px-7 py-8 md:flex"><Logo /><Navigation page={page} onPageChange={onPageChange} /><div className="mt-auto rounded-2xl bg-[#e7eee7] p-4"><p className="mb-2 text-[11px] font-semibold uppercase tracking-[.18em] text-[#708477]">Your rhythm</p><p className="font-display text-2xl text-[#31473b]">{longestStreak} days</p><p className="mt-1 text-xs text-[#789080]">Keep showing up.</p></div></aside><main className="min-w-0 flex-1 pb-24 md:pb-8">{children}</main></div><div className="md:hidden"><Navigation page={page} onPageChange={onPageChange} mobile /></div></div> }
