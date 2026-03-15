'use client'
import { motion } from 'framer-motion'

export default function ContactStep({ onUpdate, onBack, onSubmit, status }: any) {
  // inputClass uses a semi-transparent dark blue base with a light blue focus ring
  const inputClass = "w-full p-4 bg-sky-950/40 border border-sky-800 rounded-xl focus:bg-sky-900/60 focus:ring-2 focus:ring-sky-400 outline-none text-white placeholder-sky-400 transition-all";
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Your Details</h2>
      
      {/* Input Fields */}
      <input 
        placeholder="Full Name" 
        onChange={e => onUpdate('name', e.target.value)} 
        className={inputClass} 
      />
      <input 
        placeholder="City" 
        onChange={e => onUpdate('city', e.target.value)} 
        className={inputClass} 
      />
      <input 
        placeholder="Postal Code" 
        onChange={e => onUpdate('postal_code', e.target.value)} 
        className={inputClass} 
      />
      <input 
        placeholder="Phone (10 digits)" 
        onChange={e => onUpdate('phone', e.target.value)} 
        className={inputClass} 
      />
      <input 
        placeholder="Email" 
        onChange={e => onUpdate('email', e.target.value)} 
        className={inputClass} 
      />
      
      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-6">
        <button 
          onClick={onBack} 
          disabled={status === 'submitting'}
          className="w-1/3 bg-white text-black p-4 rounded-xl font-medium hover:bg-gray-200 transition disabled:opacity-50"
        >
          Back
        </button>
        
        <motion.button 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit} 
          disabled={status === 'submitting'} 
          className="w-2/3 bg-green-600 text-black p-4 rounded-xl font-bold hover:bg-green-700 transition disabled:bg-green-600 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Submitting...' : 'Finish'}
        </motion.button>
      </div>
    </div>
  )
}