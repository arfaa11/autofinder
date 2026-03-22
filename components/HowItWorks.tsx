'use client'
import { motion } from 'framer-motion'
import { Car, ShieldCheck, CheckCircle, Key } from 'lucide-react'

const steps = [
  { icon: Car, title: "Choose vehicle", desc: "Pick the type of car that fits your life" },
  { icon: ShieldCheck, title: "Check approval", desc: "We assess your situation in seconds" },
  { icon: CheckCircle, title: "Get matched", desc: "Paired with the best available lenders" },
  { icon: Key, title: "Drive away", desc: "Get behind the wheel of your new car" },
]

const trust = [
  "Works with all credit types",
  "Fast approval in minutes",
  "Multiple lending partners",
]

export default function HowItWorks() {
  return (
    <section className="w-full max-w-4xl mx-auto py-20 px-6">

      {/* section label */}
      <div className="text-center mb-14">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2">
          the process
        </p>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black">
          how it works
        </h2>
      </div>

      {/* steps grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 28 }}
            className="flex flex-col items-center text-center"
          >
            {/* step number + icon */}
            <div className="relative mb-4">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-md">
                <Icon size={22} className="text-white" />
              </div>
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 rounded-full text-white text-[9px] font-black flex items-center justify-center">
                {i + 1}
              </span>
            </div>

            <p className="text-xs font-black uppercase tracking-wider text-black mb-1">{title}</p>
            <p className="text-[11px] text-neutral-400 font-semibold leading-snug">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* divider */}
      <div className="mt-16 border-t border-neutral-100 pt-10">
        <div className="flex flex-wrap justify-center gap-4">
          {trust.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-50 border border-neutral-100 text-neutral-600 text-xs font-bold"
            >
              <ShieldCheck size={13} className="text-green-500 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}