'use client'
import { CheckCircle, Car, ShieldCheck, Key } from 'lucide-react'

/**
 * informational component detailing the user journey.
 * serves as a trust-building section to reduce funnel friction.
 */
export default function HowItWorks() {
  // configuration for process steps and associated iconography
  const steps = [
    { icon: Car, text: "Choose vehicle type" },
    { icon: ShieldCheck, text: "Check your approval" },
    { icon: CheckCircle, text: "Get matched with lenders" },
    { icon: Key, text: "Drive your new car" }
  ]

  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-6">
      <h2 className="text-2xl font-bold text-center mb-8 font-montserrat uppercase">how it works</h2>
      
      {/* responsive grid layout for process flow representation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center space-y-3">
            <div className="bg-black p-4 rounded-full text-white">
              <step.icon size={24} />
            </div>
            <p className="text-sm font-bold text-black leading-tight">{step.text}</p>
          </div>
        ))}
      </div>
      
      {/* value proposition and trust indicators */}
      <div className="mt-12 flex flex-wrap justify-center gap-4 border-t pt-8">
        {["Works with all credit types", "Fast approval in minutes", "Multiple lending partners"].map((item) => (
          <div key={item} className="flex items-center text-neutral-600 text-sm italic">
            <ShieldCheck size={16} className="mr-1 text-green-600" />
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}