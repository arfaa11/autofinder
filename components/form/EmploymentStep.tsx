'use client'
import { motion } from 'framer-motion'

export default function EmploymentStep({ onNext, onBack }: { onNext: (e: string) => void, onBack: () => void }) {
  const options = ['Not working', 'Full time', 'Part time'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black text-center">Employment Status</h2>
      <div className="space-y-3">
        {options.map(e => (
          <motion.button 
            key={e} 
            whileHover={{ scale: 1.01, borderColor: '#00000000' }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onNext(e)} 
            className="w-full p-4 border border-white rounded-xl bg-white hover:bg-gray-200 transition-all text-black font-medium text-left"
          >
            {e}
          </motion.button>
        ))}
      </div>
      <button 
        onClick={onBack} 
        className="w-full text-sm text-black hover:text-gray-600 transition mt-4"
      >
        Back
      </button>
    </div>
  )
}