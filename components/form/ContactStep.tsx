'use client'
import { motion } from 'framer-motion'

export default function ContactStep({ onUpdate, onBack, onSubmit, status }: any) {
  const inputClass = "w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none text-black";
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Your Details</h2>
      
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
      <div className="flex gap-3 pt-4">
        <button 
          onClick={onBack} 
          disabled={status === 'submitting'}
          className="w-1/3 bg-gray-100 text-gray-600 p-4 rounded-xl font-medium hover:bg-gray-200 transition disabled:opacity-50"
        >
          Back
        </button>
        
        <motion.button 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit} 
          disabled={status === 'submitting'} 
          className="w-2/3 bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Submitting...' : 'Finish'}
        </motion.button>
      </div>
    </div>
  )
}