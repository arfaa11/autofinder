import type { Metadata } from "next";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

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
      <body className={`${montserrat.variable} font-montserrat antialiased bg-white min-h-screen text-black`}>

        {/* ── header ─────────────────────────────────────────── */}
        <header className="w-full flex flex-col items-center bg-white pt-10 pb-6 relative z-10">

          {/* subtle top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-60" />

          <Image
            src="/logo.png"
            alt="autofinder logo"
            width={200}
            height={50}
            priority
            unoptimized
            className="mb-5"
          />

          <div className="text-center px-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl uppercase tracking-tight font-black leading-[1.05]">
              bad credit?{" "}
              <span className="text-blue-600 relative">
                no problem.
                {/* underline accent */}
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 opacity-30 rounded-full" />
              </span>
            </h1>
            <p className="text-lg md:text-xl mt-4 font-medium text-neutral-500 tracking-wide">
              Get approved for the car of your dreams today.
            </p>
          </div>
        </header>

        {/* ── page content ───────────────────────────────────── */}
        <main className="w-full relative z-10">
          {children}
        </main>

      </body>
    </html>
  );
}