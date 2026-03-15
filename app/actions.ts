'use server'

import { createClient } from '@/utils/supabase/server'

export async function submitLead(data: any) {
  // 1. Sanitize Phone (Preserved functionality)
  const phone = data.phone.replace(/\D/g, '');

  // 2. Validate Phone (Preserved functionality)
  if (phone.length !== 10) {
    throw new Error("Phone number must be exactly 10 digits.");
  }

  // 3. Validate Email (Preserved functionality)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error("Please enter a valid email address.");
  }

  // 4. Validate Postal Code (New functionality)
  const postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  if (!postalRegex.test(data.postal_code)) {
    throw new Error("Please enter a valid Canadian postal code (e.g., T5A 1A1).");
  }

  const supabase = await createClient()

  // 5. Database Insert (Includes all new and old fields)
  const { error } = await supabase.from('leads').insert({
    name: data.name,
    phone: phone,
    email: data.email,
    vehicle_type: data.vehicle_type,
    employment_status: data.employment_status,
    monthly_income_range: data.monthly_income_range,
    city: data.city,
    postal_code: data.postal_code.toUpperCase(),
    source: 'web_form',
    status: 'new'
  })

  if (error) {
    console.error("SUPABASE INSERT ERROR:", error)
    throw new Error("Database error. Please try again later.")
  }

  return { success: true }
}