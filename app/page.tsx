import LeadFormContainer from '@/components/LeadFormContainer'
import HowItWorks from '@/components/HowItWorks'

/** tell cloudflare that this page is dynamic, 
 * not just a collection of static files */
export const runtime = 'edge';

/**
 * home page entry point. 
 * acts as a high-level wrapper for the primary landing page components.
 */
export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      
      {/* hero and lead capture module. 
          component manages internal state and dynamic height for multi-step flow.
      */}
      <section className="w-full">
         <LeadFormContainer />
      </section>

      {/* product education and trust section */}
      <div className="w-full bg-white">
        <HowItWorks />
      </div>

      {/* conversion-focused footer with regional targeting and social proof */}
      <footer className="w-full py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="text-center space-y-3 px-4">
          <p className="text-lg md:text-xl font-bold text-black uppercase tracking-widest font-montserrat">
            trusted by drivers across canada
          </p>
          <div className="flex flex-col items-center space-y-1">
            <p className="text-sm text-neutral-500 font-medium">
              Over 320+ approvals processed just this quarter of 2026.
            </p>
            <p className="text-xs text-neutral-400 uppercase tracking-tighter">
              serving edmonton, ab & surrounding areas
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}