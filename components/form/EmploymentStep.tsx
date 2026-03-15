'use client'
import { motion } from 'framer-motion'

export default function EmploymentStep({ onNext, onBack }: { onNext: (e: string) => void, onBack: () => void }) {
  const options = ['Not working', 'Full time', 'Part time'];

  return (
    <div className="flex flex-col h-full justify-center space-y-8">
      <h2 className="text-3xl font-bold text-center text-slate-50">Employment Status</h2>
      
      <div className="space-y-4">
        {options.map((e) => (
          <motion.button 
            key={e} 
            whileHover={{ scale: 1.02, backgroundColor: '#334155' }} // Slate 700
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext(e)} 
            className="w-full p-6 border-2 border-slate-700 rounded-2xl bg-slate-800 text-slate-200 font-semibold text-lg text-left hover:border-sky-500 transition-colors"
          >
            {e}
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