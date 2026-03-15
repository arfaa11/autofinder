'use client'
import { motion } from 'framer-motion'

export default function VehicleStep({ onNext }: { onNext: (v: string) => void }) {
  const vehicles = ['SUV', 'Sedan', 'Truck', 'Van', 'Coupe', 'Hatchback', 'Convertible', 'Wagon'];

  return (
    /* Removed h-full and bg-slate-950 to allow it to blend into the main page background */
    <div className="flex flex-col w-full justify-center overflow-hidden">
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">Select Your Vehicle</h2>
      </div>

      {/* The scrollable viewport */}
      <div className="flex w-full overflow-x-auto snap-x snap-mandatory gap-6 px-[calc(50%-128px)] scrollbar-hide py-10">
        {vehicles.map((v, i) => (
          <VehicleCard key={i} name={v} onClick={() => onNext(v)} />
        ))}
      </div>
    </div>
  )
}

function VehicleCard({ name, onClick }: { name: string, onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      /* Switched to black/neutral palette with white hover/active states */
      className="snap-center flex-shrink-0 w-64 h-80 bg-neutral-900 rounded-[2rem] flex flex-col items-center justify-center p-6 border border-neutral-800 hover:border-white transition-colors"
      
      // Animations
      initial={{ opacity: 0.6, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ margin: "-20%" }} 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="w-full h-32 bg-black rounded-2xl mb-6 flex items-center justify-center font-medium text-neutral-600 text-xs tracking-widest uppercase border border-neutral-800">
        Image
      </div>
      <span className="text-xl font-bold text-white">{name}</span>
    </motion.button>
  )
}