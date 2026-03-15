export default function ContactStep({ onUpdate, onBack, onSubmit, status }: any) {
  const inputClass = "w-full p-3 text-black placeholder:text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition";
  
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
      <input placeholder="Full Name" onChange={e => onUpdate('name', e.target.value)} className={inputClass} />
      <input placeholder="City" onChange={e => onUpdate('city', e.target.value)} className={inputClass} />
      <input placeholder="Postal Code" onChange={e => onUpdate('postal_code', e.target.value)} className={inputClass} />
      <input placeholder="Phone (10 digits)" onChange={e => onUpdate('phone', e.target.value)} className={inputClass} />
      <input placeholder="Email" onChange={e => onUpdate('email', e.target.value)} className={inputClass} />
      
      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="w-1/3 bg-gray-100 text-gray-600 p-3 rounded-lg font-medium hover:bg-gray-200 transition">Back</button>
        <button onClick={onSubmit} disabled={status === 'submitting'} className="w-2/3 bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
          {status === 'submitting' ? 'Submitting...' : 'Finish'}
        </button>
      </div>
    </div>
  )
}