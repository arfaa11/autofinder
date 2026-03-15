export default function ContactStep({ onUpdate, onBack, onSubmit, status }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Your Details</h2>
      <input placeholder="Full Name" onChange={e => onUpdate('name', e.target.value)} className="w-full p-3 text-black placeholder:text-gray-600 border rounded-lg" />
      <input placeholder="City" onChange={e => onUpdate('city', e.target.value)} className="w-full p-3 text-black placeholder:text-gray-600border rounded-lg" />
      <input placeholder="Postal Code" onChange={e => onUpdate('postal_code', e.target.value)} className="w-full p-3 text-black placeholder:text-gray-600border rounded-lg" />
      <input placeholder="Phone (10 digits)" onChange={e => onUpdate('phone', e.target.value)} className="w-full p-3 text-black placeholder:text-gray-600 border rounded-lg" />
      <input placeholder="Email" onChange={e => onUpdate('email', e.target.value)} className="w-full p-3 text-black placeholder:text-gray-600 border rounded-lg" />
      <div className="flex gap-2 pt-2">
        <button onClick={onBack} className="w-1/3 bg-gray-100 p-3 rounded-lg">Back</button>
        <button onClick={onSubmit} disabled={status === 'submitting'} className="w-2/3 bg-blue-600 text-white p-3 rounded-lg font-bold">
          {status === 'submitting' ? 'Submitting...' : 'Finish'}
        </button>
      </div>
    </div>
  )
}