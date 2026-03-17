'use client'
import { motion } from 'framer-motion'
import { User, Building2, MapPin, Phone, Mail } from 'lucide-react'

export default function ContactStep({ onUpdate, onBack, onSubmit, status }: any) {
  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-3xl text-center text-black">Your Details</h2>
      
      <div className="space-y-4">
        {[
          { icon: User, key: 'name', placeholder: 'Full Name' },
          { icon: Building2, key: 'city', placeholder: 'City' },
          { icon: MapPin, key: 'postal_code', placeholder: 'Postal Code' },
          { icon: Phone, key: 'phone', placeholder: 'Phone (10 digits)' },
          { icon: Mail, key: 'email', placeholder: 'Email' }
        ].map(({ icon: Icon, key, placeholder }) => (
          <div key={key} className="input-wrapper">
            <Icon className="input-icon" size={20} strokeWidth={2} />
            <input 
              placeholder={placeholder} 
              onChange={e => onUpdate(key, e.target.value)} 
              className="input-field-with-icon" 
            />
          </div>
        ))}
      </div>
      
      <div className="flex gap-4 pt-4">
        <button 
          onClick={onBack} 
          disabled={status === 'submitting'}
          className="w-1/3 p-4 bg-[#aaaaaa] rounded-[2rem] text-black transition-colors hover:bg-[#999999] disabled:opacity-50"
        >
          Back
        </button>
        
        <motion.button 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit} 
          disabled={status === 'submitting'} 
          className="w-2/3 p-4 bg-black text-white rounded-[2rem] transition-colors hover:bg-neutral-800 disabled:bg-neutral-400"
        >
          {status === 'submitting' ? 'Submitting...' : 'Finish'}
        </motion.button>
      </div>
    </div>
  )
}