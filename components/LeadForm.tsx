'use client'

import { useState } from 'react'
import { submitLead } from '@/app/actions'

export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({})

  // This function validates the field immediately
  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    if (name === 'phone') {
      const digits = value.replace(/\D/g, '');
      newErrors.phone = digits.length !== 10 ? "Must be exactly 10 digits" : undefined;
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      newErrors.email = !emailRegex.test(value) ? "Invalid email address" : undefined;
    }
    setErrors(newErrors);
  };

  async function clientAction(formData: FormData) {
    setStatus('submitting')
    try {
      await submitLead(formData)
      setStatus('success')
    } catch (error) {
      alert("Submission failed: " + (error instanceof Error ? error.message : "Error"));
      setStatus('idle')
    }
  }

  return (
    <form action={clientAction} className="space-y-4">
      <input name="name" required placeholder="Full Name" className="w-full p-3 border rounded-lg text-black placeholder:text-gray-400" />

      <div>
        <input 
          name="phone" 
          placeholder="Phone (e.g., 416-555-0123)" 
          onBlur={(e) => validateField('phone', e.target.value)}
          className={`w-full p-3 border rounded-lg text-black placeholder:text-gray-400 ${errors.phone ? 'border-red-500' : ''}`} 
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
      </div>

      <div>
        <input 
          name="email" 
          placeholder="Email Address" 
          onBlur={(e) => validateField('email', e.target.value)}
          className={`w-full p-3 border rounded-lg text-black placeholder:text-gray-400 ${errors.email ? 'border-red-500' : ''}`} 
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      <select name="vehicle_type" className="w-full p-3 border rounded-lg text-black bg-white" defaultValue="" required>
        <option value="" disabled className="text-gray-400">Interested in...</option>
        <option value="sedan">Sedan</option>
        <option value="suv">SUV</option>
      </select>

      <button 
        type="submit" 
        disabled={status === 'submitting' || !!errors.phone || !!errors.email}
        className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-gray-400"
      >
        {status === 'submitting' ? 'Submitting...' : 'Get My Matches'}
      </button>
    </form>
  )
}