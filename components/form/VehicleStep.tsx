'use client'
import { motion } from 'framer-motion'

export default function VehicleStep({ onNext }: { onNext: (v: string) => void }) {
  const vehicles = [
    { name: 'SUV' }, { name: 'Sedan' }, { name: 'Truck' }, { name: 'Van' },
    { name: 'Coupe' }, { name: 'Hatchback' }, { name: 'Convertible' }, { name: 'Wagon' }
  ];
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Vehicle</h2>
        <p className="text-gray-500 text-sm">Select the type you're looking for</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {vehicles.map((v) => (
          <motion.button 
            key={v.name} 
            whileHover={{ y: -4, borderColor: '#3b82f6' }} 
            whileTap={{ scale: 0.97 }}
            onClick={() => onNext(v.name)} 
            className="group flex flex-col items-center bg-white border border-gray-200 rounded-2xl p-3 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Image Placeholder - Now larger for better UI balance */}
            <div className="w-full h-24 bg-gray-100 rounded-xl mb-3 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 transition-colors">
              <span className="text-[10px] uppercase font-bold tracking-wider">Image Area</span>
            </div>
            <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{v.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}