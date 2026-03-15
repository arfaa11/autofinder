'use client'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function VehicleStep({ onNext }: { onNext: (v: string) => void }) {
  const vehicles = ['SUV', 'Sedan', 'Truck', 'Van', 'Coupe', 'Hatchback', 'Convertible', 'Wagon'];
  const displayVehicles = [...vehicles, ...vehicles, ...vehicles];
  const x = useMotionValue(0);

  return (
    <div className="flex flex-col h-full w-full justify-center items-center overflow-hidden [perspective:2000px]">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white tracking-tight">Select Your Vehicle</h2>
        <p className="text-sky-100 text-sm mt-2">Spin the wheel to choose your ride</p>
      </div>

      <div className="flex items-center justify-center w-full">
        <motion.div 
          drag="x"
          style={{ x }}
          dragConstraints={{ left: -2200, right: 0 }}
          dragElastic={0.15}
          className="flex items-center gap-20 cursor-grab active:cursor-grabbing"
        >
          {displayVehicles.map((v, i) => (
            <VehicleCard key={i} name={v} x={x} index={i} onClick={() => onNext(v)} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function VehicleCard({ name, x, index, onClick }: any) {
  const offset = index * 400;
  
  const rotateY = useTransform(x, [offset - 600, offset, offset + 600], [25, 0, -25]);
  const scale = useTransform(x, [offset - 600, offset, offset + 600], [0.85, 1.15, 0.85]);

  return (
    <motion.button
      onClick={onClick}
      style={{ rotateY, scale }}
      // REMOVED SHADOWS: Hover only scales and lifts, no box-shadow
      whileHover={{ 
        y: -15, 
        scale: 1.05, 
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 1.025, rotateY: 0 }} 
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      // BORDER: Replaced shadow-2xl with a clean, thick border
      className="flex-shrink-0 w-72 h-96 bg-white rounded-[2.5rem] flex flex-col items-center justify-center p-8 border-[6px] border-sky-100 hover:border-sky-400 transition-colors"
    >
      <div className="w-full h-48 bg-sky-50 rounded-3xl mb-8 flex items-center justify-center font-black text-sky-400 text-sm tracking-widest uppercase">
        Vehicle Image
      </div>
      <span className="text-3xl font-black text-blue-950">{name}</span>
    </motion.button>
  )
}