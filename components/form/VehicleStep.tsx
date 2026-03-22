'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const vehicles = [
  { name: 'SUV', image: '/images/suv.png' },
  { name: 'Sedan', image: '/images/sedan.png' },
  { name: 'Truck', image: '/images/truck.png' },
  { name: 'Van', image: '/images/van.png' },
  { name: 'Coupe', image: '/images/coupe.png' },
  { name: 'Hatchback', image: '/images/hatchback.png' },
]

export default function VehicleStep({ onNext }: { onNext: (v: string) => void }) {
  return (
    <div className="flex flex-col w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-black uppercase tracking-tight">
          what are you looking for?
        </h2>
        <p className="text-xs text-neutral-400 font-semibold uppercase tracking-widest mt-1">
          choose a vehicle type
        </p>
      </div>

      {/* horizontal scroll carousel */}
      <div className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 px-[calc(50%-120px)] scrollbar-hide py-4">
        {vehicles.map((v, i) => (
          <motion.button
            key={v.name}
            type="button"
            onClick={() => onNext(v.name)}
            className="car-tile snap-center flex-shrink-0 w-56 h-64 flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 28 }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            <div className="w-full h-36 relative overflow-hidden">
              <Image
                src={v.image}
                alt={v.name}
                fill
                className="object-contain mix-blend-multiply"
                unoptimized
              />
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-black">
              {v.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* swipe hint */}
      <p className="text-center text-[10px] text-neutral-400 font-semibold uppercase tracking-wider mt-3">
        swipe to explore
      </p>
    </div>
  )
}