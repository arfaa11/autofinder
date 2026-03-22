import LeadFormContainer from '@/components/LeadFormContainer'
import HowItWorks from '@/components/HowItWorks'

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">

      {/* hero + lead capture */}
      <section className="w-full">
        <LeadFormContainer />
      </section>

      {/* education / trust */}
      <div className="w-full bg-white">
        <HowItWorks />
      </div>

      {/* footer */}
      <footer className="w-full py-14 bg-neutral-950 relative overflow-hidden">
        {/* subtle blue glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[200px] bg-blue-600 opacity-[0.07] blur-[80px] rounded-full" />
        </div>

        <div className="relative text-center space-y-3 px-4">
          <p className="text-base md:text-lg font-black text-white uppercase tracking-[0.2em]">
            trusted by drivers across canada
          </p>
          <div className="w-12 h-[2px] bg-blue-600 mx-auto rounded-full opacity-60" />
          <p className="text-sm text-neutral-400 font-medium">
            Over 320+ approvals processed this quarter of 2026.
          </p>
          <p className="text-xs text-neutral-600 uppercase tracking-widest pt-1">
            serving edmonton, ab &amp; surrounding areas
          </p>
        </div>
      </footer>
    </div>
  )
}