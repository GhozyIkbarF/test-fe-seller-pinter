import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/layout/providers";
import { Archivo } from 'next/font/google'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Blog genzet",
  description: "The Journal : Design Resources, Interviews, and Industry News",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} bg-gray-100`}
      >
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
