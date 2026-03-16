'use server'

import { createClient } from '@/utils/supabase/server'
import { Resend } from 'resend'

// Initialize Resend with your environment variable
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function submitLead(data: any) {
  // 1. Sanitize Phone
  const phone = data.phone.replace(/\D/g, '');

  // 2. Validation Checks
  if (phone.length !== 10) throw new Error("Phone number must be exactly 10 digits.");
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) throw new Error("Please enter a valid email address.");
  
  const postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  if (!postalRegex.test(data.postal_code)) throw new Error("Invalid postal code.");

  const supabase = await createClient()

  // 3. Database Insert
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

  // 4. Trigger Email Notification via Resend
  try {
    await resend.emails.send({
      from: 'AutoFinder <onboarding@resend.dev>',
      to: 'arfaamumtaz@hotmail.com',
      subject: `New Lead: ${data.name}`,
      html: `
        <h2>New Lead Details</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Vehicle:</strong> ${data.vehicle_type}</p>
        <p><strong>City:</strong> ${data.city}</p>
        <p><strong>Postal Code:</strong> ${data.postal_code.toUpperCase()}</p>
      `
    });
  } catch (err) {
    // We log the error but don't stop the user, as the database save succeeded
    console.error("Email notification failed:", err);
  }

  return { success: true }
}