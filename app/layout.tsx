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
        <header className="h-32 flex-shrink-0 flex justify-center items-center bg-white z-50">
          <Image 
            src="/logo.png" 
            alt="autofinder Logo" 
            width={240} 
            height={60} 
            priority
          />
        </header>

        {/* Content Area - Fills remaining space, scrolls only if necessary */}
        <main className="flex-grow w-full overflow-y-auto flex items-center justify-center pb-8">
          {children}
        </main>
        
      </body>
    </html>
  );
}