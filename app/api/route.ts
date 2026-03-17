import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { Resend } from 'resend';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. Setup Services
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const supabase = await createClient();

    // 2. Validation
    const phone = data.phone.replace(/\D/g, '');
    if (phone.length !== 10) throw new Error("Phone number must be exactly 10 digits.");
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) throw new Error("Invalid email address.");

    // 3. Insert into Supabase
    const { error: sbError } = await supabase.from('leads').insert({
      name: data.name,
      phone: phone,
      email: data.email,
      vehicle_type: data.vehicle_type,
      employment_status: data.employment_status,
      monthly_income_range: data.monthly_income_range,
      city: data.city,
      postal_code: data.postal_code?.toUpperCase() || '',
      source: 'web_form',
      status: 'new'
    });

    if (sbError) throw new Error("Database error. Please try again.");

    // 4. Send Email Alert
    try {
      await resend.emails.send({
        from: 'autofinder <onboarding@resend.dev>',
        to: 'arfaamumtaz@hotmail.com',
        subject: `new lead: ${data.name}`,
        html: `<p><strong>Name:</strong> ${data.name}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Email:</strong> ${data.email}</p>`
      });
    } catch (e) {
      console.error("Email failed, but lead saved.");
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}