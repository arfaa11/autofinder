import type { Metadata } from "next";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import "./globals.css";

// global font configuration for branding and headers
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-montserrat",
});

// global seo and metadata config
export const metadata: Metadata = {
  title: "autofinder",
  description: "helping canadians find their perfect ride with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* using min-h-screen to ensure the body spans the full viewport 
          while allowing vertical growth for long form content.
      */}
      <body className={`${montserrat.variable} font-sans antialiased bg-white min-h-screen`}>
        
        {/* primary navigation and brand hero header */}
        <header className="w-full flex flex-col justify-center items-center bg-white pt-12 pb-8 space-y-4">
          <Image 
            src="/logo.png" 
            alt="autofinder logo" 
            width={220} 
            height={55} 
            priority
          />
          <div className="text-center px-4">
            <h1 className="font-montserrat text-3xl md:text-5xl text-black uppercase tracking-tight">
              bad credit? <span className="text-blue-600">no problem.</span>
            </h1>
            <p className="text-xl md:text-2xl text-black mt-2 font-medium">
              Get approved for a car in Edmonton today.
            </p>
          </div>
        </header>

        {/* main content injection point for page routes */}
        <main className="w-full">
          {children}
        </main>
        
      </body>
    </html>
  );
}