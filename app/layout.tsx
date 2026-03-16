import type { Metadata } from "next";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "autofinder",
  description: "Helping Canadians find their perfect ride with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased bg-white h-screen flex flex-col`}>
        
        {/* Header - Fixed height, centered */}
        <header className="h-40 flex-shrink-0 flex flex-col justify-center items-center bg-white z-50 space-y-2">
          <Image 
            src="/logo.png" 
            alt="autofinder Logo" 
            width={240} 
            height={60} 
            priority
          />
          <p className="text-lg text-center text-black">
            Canada's #1 platform for finding your next car with confidence.
          </p>
        </header>

        {/* Content Area - Fills remaining space, scrolls only if necessary */}
        <main className="flex-grow w-full overflow-y-auto flex items-center justify-center pb-8">
          {children}
        </main>
        
      </body>
    </html>
  );
}