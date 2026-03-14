'use server'

import { createClient } from '@/utils/supabase/server'

export async function submitLead(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const rawPhone = formData.get('phone') as string;
  const vehicle = formData.get('vehicle_type') as string;

  // 1. Sanitize: Remove everything that isn't a digit
  const phone = rawPhone.replace(/\D/g, '');

  // 2. Validate: Must be exactly 10 digits
  if (phone.length !== 10) {
    throw new Error("Phone number must be exactly 10 digits.");
  }

  // 3. Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  const supabase = await createClient()

  const { error } = await supabase.from('leads').insert({
    name,
    phone, // Now stored as a clean 10-digit string
    email,
    vehicle_type: vehicle,
    source: 'web_form',
  })

  if (error) {
    console.error("SUPABASE INSERT ERROR:", error)
    throw new Error("Database error. Please try again later.")
  }

  return { success: true }
}