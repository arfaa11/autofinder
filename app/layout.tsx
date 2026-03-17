import type { Metadata } from "next";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import "./globals.css";

// load montserrat font and assign to a css variable
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"], // added more weights for better scaling
  variable: "--font-montserrat",
});

// seo metadata
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
      {/* fix: applied the font-montserrat class directly to the body.
          this ensures tailwind uses your custom font instead of the browser default.
      */}
      <body className={`${montserrat.variable} font-montserrat antialiased bg-white min-h-screen text-black`}>
        
        {/* branding header */}
        <header className="w-full flex flex-col justify-center items-center bg-white pt-12 pb-8 space-y-4">
          <Image 
            src="/logo.png" 
            alt="autofinder logo" 
            width={220} 
            height={55} 
            priority
          />
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-5xl uppercase tracking-tight font-black">
              bad credit? <span className="text-blue-600">no problem.</span>
            </h1>
            <p className="text-xl md:text-2xl mt-2 font-medium">
              get approved for a car in edmonton today.
            </p>
          </div>
        </header>

        {/* page content wrapper */}
        <main className="w-full">
          {children}
        </main>
        
      </body>
    </html>
  );
}