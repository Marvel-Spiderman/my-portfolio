import type { Metadata } from "next";
import { Sora, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rounitraj.dev"),
  title: "Rounit Raj | Interactive Developer Experience",
  description: "Explore the premium interactive game-inspired developer portfolio of Rounit Raj. Discover projects in full stack, AI/ML models, cloud architecture, and sleek design systems.",
  authors: [{ name: "Rounit Raj" }],
  openGraph: {
    title: "Rounit Raj | Interactive Developer Experience",
    description: "Immersive portfolio highlighting full stack, AI/ML, cloud practitioner metrics, and custom illustrations.",
    url: "https://rounitraj.dev",
    siteName: "Portfolio",
    images: [
      {
        url: "/assets/preview.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rounit Raj | Interactive Developer Experience",
    description: "Immersive portfolio highlighting full stack, AI/ML, cloud metrics, and custom illustrations.",
    images: ["/assets/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(sora.variable, jetbrainsMono.variable, "font-sans", geist.variable)}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
