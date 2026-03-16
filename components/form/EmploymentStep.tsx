'use client'
import { motion } from 'framer-motion'

export default function EmploymentStep({ onNext, onBack }: { onNext: (e: string) => void, onBack: () => void }) {
  const options = ['Not working', 'Full time', 'Part time'];

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-3xl text-center text-black">Employment Status</h2>
      
      <div className="space-y-4">
        {options.map((e) => (
          <motion.button 
            key={e} 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext(e)} 
            className="btn-tile"
          >
            {e}
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