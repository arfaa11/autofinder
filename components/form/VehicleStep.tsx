'use client'
import { motion } from 'framer-motion'

export default function VehicleStep({ onNext }: { onNext: (v: string) => void }) {
  const vehicles = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Van'];

  return (
    <div className="flex flex-col w-full">
      <div className="text-center mb-4">
        <h2 className="text-3xl text-black">Select Your Vehicle</h2>
      </div>

      {/* The scrollable viewport with snap-scrolling */}
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
      /* btn-tile: modular base styling
         snap-center: ensures the card locks into the center of the viewport
         flex-shrink-0: keeps the cards from squishing 
      */
      className="car-tile snap-center flex-shrink-0 w-64 h-80 flex flex-col items-center justify-center border border-white hover:border-black transition-colors"
      
      // Snappy, responsive interaction animations
      whileHover={{ y: -5, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }}
    >
      {/* Visual Placeholder for Vehicle Image */}
      <div className="w-full h-48 bg-gray-300 rounded-[1.5rem] mb-6 flex items-center justify-center font-bold text-[#666666] uppercase tracking-widest">
        {name}
      </div>
      <span className="text-xl text-black font-bold">{name}</span>
    </motion.button>
  )
}