'use client'
import { motion } from 'framer-motion'

export default function ContactStep({ onUpdate, onBack, onSubmit, status }: any) {
  // Updated to match the Slate/Sky theme: Slate-800 background, Slate-700 border, Sky focus
  const inputClass = "w-full p-4 bg-slate-800 border-2 border-slate-700 rounded-2xl focus:border-sky-500 outline-none text-slate-100 placeholder-slate-400 transition-all";
  
  return (
    <div className="flex flex-col h-full justify-center space-y-6">
      <h2 className="text-3xl font-bold text-center text-slate-50 mb-4">Your Details</h2>
      
      {/* Input Fields */}
      <div className="space-y-4">
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
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-4">
        <button 
          onClick={onBack} 
          disabled={status === 'submitting'}
          className="w-1/3 bg-slate-800 text-slate-300 p-4 rounded-2xl font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50"
        >
          Back
        </button>
        
        <motion.button 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit} 
          disabled={status === 'submitting'} 
          className="w-2/3 bg-sky-500 text-white p-4 rounded-2xl font-bold hover:bg-sky-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Submitting...' : 'Finish'}
        </motion.button>
      </div>
    </div>
  )
}