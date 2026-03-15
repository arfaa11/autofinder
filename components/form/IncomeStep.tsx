export default function IncomeStep({ onNext, onBack }: { onNext: (i: string) => void, onBack: () => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg text-black placeholder:text-gray-600 font-bold">Monthly Income</h2>
      {['<$1500', '$1500-$3000', '>$3000'].map(i => (
        <button key={i} onClick={() => onNext(i)} className="w-full p-3 text-black placeholder:text-gray-600 border-2 rounded-lg hover:border-blue-600 text-left">{i}</button>
      ))}
      <button onClick={onBack} className="text-sm text-gray-400">Back</button>
    </div>
  )
}