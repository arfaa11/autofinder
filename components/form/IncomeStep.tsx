'use client'
import { motion } from 'framer-motion'

export default function IncomeStep({ onNext, onBack }: { onNext: (i: string) => void, onBack: () => void }) {
  const options = ['<$1,500', '$1,500 - $3,000', '>$3,000'];

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-3xl text-center text-black">Monthly Income</h2>
      
      <div className="space-y-4">
        {options.map((i) => (
          <motion.button 
            key={i} 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext(i)} 
            className="btn-tile"
          >
            {i}
          </motion.button>
        ))}
      </div>

      <button 
        onClick={onBack} 
        className="text-sm text-[#666666] text-center transition-colors hover:text-black"
      >
        Back
      </button>
    </div>
  )
}