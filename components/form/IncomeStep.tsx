export default function IncomeStep({ onNext, onBack }: { onNext: (i: string) => void, onBack: () => void }) {
  const btnClass = "w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-black text-left";
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Monthly Income</h2>
      <div className="space-y-3">
        {['<$1500', '$1500-$3000', '>$3000'].map(i => (
          <button key={i} onClick={() => onNext(i)} className={btnClass}>{i}</button>
        ))}
      </div>
      <button onClick={onBack} className="text-sm text-gray-500 underline hover:text-gray-800">Back</button>
    </div>
  )
}