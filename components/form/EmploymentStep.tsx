export default function EmploymentStep({ onNext, onBack }: { onNext: (e: string) => void, onBack: () => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg text-black placeholder:text-gray-600 font-bold">Employment Status</h2>
      {['Not working', 'Full time', 'Part time'].map(e => (
        <button key={e} onClick={() => onNext(e)} className="w-full p-3 text-black placeholder:text-gray-600 border-2 rounded-lg hover:border-blue-600 text-left">{e}</button>
      ))}
      <button onClick={onBack} className="text-sm text-gray-400">Back</button>
    </div>
  )
}