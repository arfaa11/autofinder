'use server'

import { createClient } from '@/utils/supabase/server'
import { Resend } from 'resend'

// setup email service
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function submitLead(data: any) {
  // strip non-digits from phone number
  const phone = data.phone.replace(/\D/g, '');

  // data validation for phone, email, and postal code
  if (phone.length !== 10) throw new Error("phone number must be exactly 10 digits.");
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) throw new Error("please enter a valid email address.");
  
  const postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  if (!postalRegex.test(data.postal_code)) throw new Error("invalid postal code.");

  const supabase = await createClient()

  // insert lead data into supabase
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
    console.error("supabase insert error:", error)
    throw new Error("database error. please try again later.")
  }

  // send email alert to admin
  try {
    await resend.emails.send({
      from: 'autofinder <onboarding@resend.dev>',
      to: 'arfaamumtaz@hotmail.com',
      subject: `new lead: ${data.name}`,
      html: `
        <h2>new lead details</h2>
        <p><strong>name:</strong> ${data.name}</p>
        <p><strong>phone:</strong> ${phone}</p>
        <p><strong>email:</strong> ${data.email}</p>
        <p><strong>vehicle:</strong> ${data.vehicle_type}</p>
        <p><strong>city:</strong> ${data.city}</p>
        <p><strong>postal code:</strong> ${data.postal_code.toUpperCase()}</p>
      `
    });
  } catch (err) {
    // log email failure but don't block the user
    console.error("email notification failed:", err);
  }

  return { success: true }
}