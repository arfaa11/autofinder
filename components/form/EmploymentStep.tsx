'use client'
import { motion } from 'framer-motion'

export default function EmploymentStep({ onNext, onBack }: { onNext: (e: string) => void, onBack: () => void }) {
  // list of employment categories
  const options = ['Not working', 'Full-time', 'Part-time'];

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-3xl text-center text-black font-montserrat uppercase">employment status</h2>
      
      <div className="space-y-4">
        {/* selection buttons for user work status */}
        {options.map((e) => (
          <motion.button 
            key={e} 
            type="button"
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext(e)} 
            className="btn-tile font-bold"
          >
            {e}
          </motion.button>
        ))}
      </div>

      {/* return to vehicle selection step */}
      <button 
        type="button"
        onClick={onBack} 
        className="w-1/3 p-4 bg-black rounded-[2rem] text-white transition-colors hover:bg-neutral-800 disabled:opacity-50 self-center font-bold uppercase"
      >
        back
      </button>
    </div>
  )
}