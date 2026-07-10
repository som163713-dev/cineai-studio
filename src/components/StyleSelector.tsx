'use client'
import { styles } from '@/config/styles'

interface StyleSelectorProps { value: string; onChange: (style: string) => void }

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold">Style</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {Object.entries(styles).map(([key, style]) => (
          <button key={key} onClick={() => onChange(key)} className={`p-3 rounded-xl border-2 text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${value === key ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10' : 'border-dark-3 hover:border-primary/50 text-muted-foreground hover:text-white'}`}>
            <div className="text-2xl mb-1">{style.icon}</div>
            <span className="text-xs font-medium">{style.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}