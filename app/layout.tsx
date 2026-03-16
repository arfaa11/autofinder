import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // 1. Import Montserrat
import "./globals.css";

// 2. Configure Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"], // You wanted Montserrat Bold
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Minimalist Lead Form",
  description: "Seamless lead capture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply the font class and font-variable to the html/body */}
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}