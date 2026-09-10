import type { ReactNode } from 'react'
export function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="block"><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#85958a]">{label}</span>{children}</label> }
