export default function VehicleStep({ onNext }: { onNext: (v: string) => void }) {
  const btnClass = "p-6 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all text-black font-semibold";
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Select Vehicle Type</h2>
      <div className="grid grid-cols-2 gap-4">
        {['SUV', 'Sedan', 'Truck', 'Van'].map(v => (
          <button key={v} onClick={() => onNext(v)} className={btnClass}>{v}</button>
        ))}
      </div>
    </div>
  )
}