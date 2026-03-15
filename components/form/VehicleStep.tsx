export default function VehicleStep({ onNext }: { onNext: (v: string) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Select Vehicle</h2>
      <div className="grid grid-cols-2 gap-4">
        {['SUV', 'Sedan', 'Truck', 'Van'].map(v => (
          <button key={v} onClick={() => onNext(v)} className="p-4 text-black placeholder:text-gray-600 border-2 rounded-xl hover:border-blue-600">{v}</button>
        ))}
      </div>
    </div>
  )
}