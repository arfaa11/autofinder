'use client'
import { motion } from 'framer-motion'

export default function IncomeStep({ onNext, onBack }: { onNext: (i: string) => void, onBack: () => void }) {
  const options = ['<$1,500', '$1,500 - $3,000', '>$3,000'];

  return (
    <div className="flex flex-col h-full justify-center space-y-8">
      <h2 className="text-3xl font-bold text-center text-slate-50">Monthly Income</h2>
      
      <div className="space-y-4">
        {options.map((i) => (
          <motion.button 
            key={i} 
            whileHover={{ scale: 1.02, backgroundColor: '#334155' }} 
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext(i)} 
            className="w-full p-6 border-2 border-slate-700 rounded-2xl bg-slate-800 text-slate-200 font-semibold text-lg text-left hover:border-sky-500 transition-colors"
          >
            {i}
          </motion.button>
        ))}
      </div>

      <button 
        onClick={onBack} 
        className="text-sm text-slate-400 hover:text-slate-200 transition-colors mt-4 text-center"
      >
        Back
      </button>
    </div>
  )
}