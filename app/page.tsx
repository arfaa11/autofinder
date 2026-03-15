// app/page.tsx
import LeadFormContainer from '@/components/LeadFormContainer'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* We are now using the Container, which handles the internal routing */}
      <LeadFormContainer />
    </main>
  )
}