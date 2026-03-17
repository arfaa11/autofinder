'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function VehicleStep({ onNext }: { onNext: (v: string) => void }) {
  // list of available vehicle categories
  const vehicles = [
    { name: 'SUV', image: '/images/suv.png' },
    { name: 'Sedan', image: '/images/sedan.png' },
    { name: 'Truck', image: '/images/truck.png' },
    { name: 'Van', image: '/images/van.png' },
    { name: 'Coupe', image: '/images/coupe.png' },
    { name: 'Hatchback', image: '/images/hatchback.png' },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="text-center mb-4">
        <h2 className="text-3xl text-black font-montserrat uppercase">select vehicle type</h2>
      </div>

      {/* horizontal scroll container for car selection */}
      <div className="flex w-full overflow-x-auto snap-x snap-mandatory gap-6 px-[calc(50%-128px)] scrollbar-hide py-10">
        {vehicles.map((v, i) => (
          <VehicleCard key={i} vehicle={v} onClick={() => onNext(v.name)} />
        ))}
      </div>
    </div>
  )
}

function VehicleCard({ vehicle, onClick }: { vehicle: { name: string, image: string }, onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="car-tile snap-center flex-shrink-0 w-64 h-80 flex flex-col items-center justify-center border-2 border-transparent hover:border-black transition-colors"
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="w-full h-48 mb-6 relative overflow-hidden">
        <Image 
          src={vehicle.image} 
          alt={vehicle.name} 
          fill 
          className="object-contain mix-blend-multiply" 
          unoptimized
        />
      </div>
      <span className="text-xl text-black font-bold uppercase">{vehicle.name}</span>
    </motion.button>
  )
}