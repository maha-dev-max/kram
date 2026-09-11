import { useEffect, useRef, useState } from 'react'

export function SkipReasonModal({ onCancel, onSkip }: { onCancel: () => void; onSkip: (reason: string) => void }) {
  const [reason, setReason] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#25382e]/30 p-0 backdrop-blur-sm md:items-center md:p-6" onMouseDown={(event) => { if (event.currentTarget === event.target) onCancel() }}><div role="dialog" aria-modal="true" aria-labelledby="skip-habit-title" className="w-full max-w-lg rounded-t-3xl bg-[#fbfcfa] p-6 shadow-2xl md:rounded-3xl md:p-8"><div className="mb-6"><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#8a998f]">A moment to notice</p><h2 id="skip-habit-title" className="mt-1 font-display text-3xl text-[#31473b]">Skip this habit?</h2><p className="mt-3 text-sm leading-6 text-[#718077]">You can add a reason to help KRAM understand your patterns.</p></div><label htmlFor="skip-reason" className="text-xs font-semibold uppercase tracking-[.17em] text-[#8a998f]">Reason <span className="font-normal normal-case tracking-normal">(optional)</span></label><textarea ref={inputRef} id="skip-reason" value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Why are you skipping today?" rows={3} className="mt-3 w-full resize-none rounded-2xl border border-[#e1e8e1] bg-white p-4 text-sm text-[#53655a] outline-none transition placeholder:text-[#b0bbb2] focus:border-[#9db9a1] focus:ring-2 focus:ring-[#e5f0e6]" /><div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row"><button type="button" onClick={onCancel} className="flex-1 rounded-xl border border-[#dbe4da] py-3 text-sm font-semibold text-[#75867b] transition hover:bg-[#f2f5f1]">Cancel</button><button type="button" onClick={() => onSkip('')} className="flex-1 rounded-xl border border-[#ead1c5] bg-[#fffdfb] py-3 text-sm font-semibold text-[#a36e5b] transition hover:bg-[#f8eee8]">Skip without reason</button><button type="button" onClick={() => onSkip(reason.trim())} className="flex-1 rounded-xl bg-[#31473b] py-3 text-sm font-semibold text-white transition hover:bg-[#25382c]">Skip &amp; save reason</button></div></div></div>
}
