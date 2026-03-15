'use client'
import { motion } from 'framer-motion'

export default function IncomeStep({ onNext, onBack }: { onNext: (i: string) => void, onBack: () => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Monthly Income</h2>
      <div className="space-y-3">
        {['<$1500', '$1500-$3000', '>$3000'].map(i => (
          <motion.button 
            key={i} 
            whileHover={{ scale: 1.01, borderColor: '#3b82f6' }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onNext(i)} 
            className="w-full p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all text-gray-800 font-medium text-left"
          >
            {i}
          </motion.button>
        ))}
      </div>
      <button onClick={onBack} className="w-full text-sm text-gray-400 hover:text-gray-600 transition">Back</button>
    </div>
  )
}