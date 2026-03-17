'use client'
import { motion } from 'framer-motion'
import { User, Building2, MapPin, Phone, Mail } from 'lucide-react'

/**
 * final step of the lead form. 
 * captures personal info and handles the final submission state.
 */
export default function ContactStep({ onUpdate, onBack, onSubmit, status }: any) {
  // configuration for form inputs and accessibility attributes
  const fields = [
    { icon: User, key: 'name', placeholder: 'full name', type: 'text' },
    { icon: Building2, key: 'city', placeholder: 'city', type: 'text' },
    { icon: MapPin, key: 'postal_code', placeholder: 'postal code', type: 'text' },
    { icon: Phone, key: 'phone', placeholder: 'phone (10 digits)', type: 'tel' },
    { icon: Mail, key: 'email', placeholder: 'email', type: 'email' }
  ]

  const isSubmitting = status === 'submitting'

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-3xl text-center text-black font-montserrat uppercase">your details</h2>
      
      <div className="space-y-4">
        {fields.map(({ icon: Icon, key, placeholder, type }) => (
          <div key={key} className="input-wrapper">
            <Icon className="input-icon" size={20} strokeWidth={2} />
            <input 
              id={key}
              name={key}
              type={type}
              placeholder={placeholder} 
              onChange={e => onUpdate(key, e.target.value)} 
              className="input-field-with-icon" 
              disabled={isSubmitting}
              // helps browser autofill engines map the data correctly
              autoComplete={key}
            />
          </div>
        ))}
      </div>
      
      <div className="flex gap-4 pt-4">
        {/* navigation buttons */}
        <button 
          type="button"
          onClick={onBack} 
          disabled={isSubmitting}
          className="w-1/3 p-4 bg-[#aaaaaa] rounded-[2rem] text-black transition-colors hover:bg-[#999999] disabled:opacity-50 font-bold uppercase"
        >
          back
        </button>
        
        <motion.button 
          type="button"
          whileHover={!isSubmitting ? { scale: 1.02 } : {}} 
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          onClick={onSubmit} 
          disabled={isSubmitting} 
          className="w-2/3 p-4 bg-black text-white rounded-[2rem] transition-colors hover:bg-neutral-800 disabled:bg-neutral-400 font-bold uppercase"
        >
          {isSubmitting ? 'submitting...' : 'finish'}
        </motion.button>
      </div>
    </div>
  )
}