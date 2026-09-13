import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NutriSaaS — AI-Powered Nutrition & Fitness Platform",
  description: "Transform your health journey with AI-generated nutrition plans, food scanning, gym workouts, and a Darija-speaking chatbot. Premium AI health coaching.",
  keywords: ["nutrition", "fitness", "AI", "meal plan", "gym", "food scanner", "darija", "health", "wellness"],
  openGraph: {
    title: "NutriSaaS — AI-Powered Nutrition & Fitness",
    description: "Transform your health journey with AI-powered nutrition plans and fitness coaching.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${spaceGrotesk.variable} h-full`}>
      <head>
        <meta name="theme-color" content="#080f1e" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-full bg-dark-900 text-dark-100 antialiased">
        {children}
        {/* Puter.js — Free, unlimited OpenAI API (User-Pays model) */}
        <Script
          src="https://js.puter.com/v2/"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
