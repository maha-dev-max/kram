import type { Page } from '../../types'

const nav: { name: Page; icon: string }[] = [{ name: 'Today', icon: '⌂' }, { name: 'Habits', icon: '◌' }, { name: 'History', icon: '▦' }, { name: 'Insights', icon: '↗' }]

export function Navigation({ page, onPageChange, mobile = false }: { page: Page; onPageChange: (page: Page) => void; mobile?: boolean }) { return <nav className={mobile ? 'fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t border-[#dfe5df] bg-[#f7f8f5]/95 px-3 py-3 backdrop-blur' : 'mt-14 space-y-2'}>{nav.map((item) => <button key={item.name} onClick={() => onPageChange(item.name)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${mobile ? 'flex-col gap-1 px-4 py-1 text-[10px]' : 'w-full'} ${page === item.name ? 'bg-[#dce9de] font-semibold text-[#385440]' : 'text-[#829087] hover:bg-[#eaf0ea]'}`}><span className={mobile ? 'text-lg leading-none' : 'text-lg'}>{item.icon}</span>{item.name}</button>)}</nav> }
