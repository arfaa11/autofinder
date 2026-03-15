// app/page.tsx
import LeadFormContainer from '@/components/LeadFormContainer'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-950">
      {/* We are now using the Container, which handles the internal routing */}
      <LeadFormContainer />
    </main>
  )
}