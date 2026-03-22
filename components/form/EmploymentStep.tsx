'use client'
import { motion } from 'framer-motion'
import { Briefcase, Clock, XCircle } from 'lucide-react'

const options = [
  { label: 'Full-time', icon: Briefcase, desc: 'Employed full-time' },
  { label: 'Part-time', icon: Clock, desc: 'Employed part-time' },
  { label: 'Not working', icon: XCircle, desc: 'Currently unemployed' },
]

export default function EmploymentStep({
  onNext,
  onBack,
}: {
  onNext: (e: string) => void
  onBack: () => void
}) {
  return (
    <div className="flex flex-col space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-black text-black uppercase tracking-tight">
          employment status
        </h2>
        <p className="text-xs text-neutral-400 font-semibold uppercase tracking-widest mt-1">
          select your current situation
        </p>
      </div>

      <div className="space-y-3 pt-2">
        {options.map(({ label, icon: Icon, desc }, i) => (
          <motion.button
            key={label}
            type="button"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext(label)}
            className="btn-tile flex items-center gap-4"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-sm">
              <Icon size={18} strokeWidth={2} className="text-neutral-700" />
            </div>
            <div className="text-left">
              <div className="text-sm font-black uppercase tracking-wide">{label}</div>
              <div className="text-xs text-neutral-400 font-semibold">{desc}</div>
            </div>
          </motion.button>
        ))}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-2 self-start text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
      >
        ← back
      </button>
    </div>
  )
}