import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NeuralCursor } from "@/components/ui/NeuralCursor";
import { CRTOverlay } from "@/components/ui/CRTOverlay";
import { MatrixBackground } from "@/components/ui/MatrixBackground";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["100", "400", "700", "800"],
});

export const metadata: Metadata = {
  title: "OG.PCSTYLE // IMAGE_GENERATOR",
  description: "Dynamic Open Graph image generator with cyberpunk aesthetics",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "OG.PCSTYLE // IMAGE_GENERATOR",
    description: "Dynamic Open Graph image generator with cyberpunk aesthetics",
    url: "https://og.pcstyle.dev",
    siteName: "OG.PCSTYLE",
    images: [
      {
        url: "https://og.pcstyle.dev/api/og?title=OG%20GENERATOR&subtitle=Dynamic%20OpenGraph%20Images&icon=image&theme=magenta",
        width: 1200,
        height: 630,
        alt: "OG Generator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OG.PCSTYLE // IMAGE_GENERATOR",
    description: "Dynamic Open Graph image generator with cyberpunk aesthetics",
    images: ["https://og.pcstyle.dev/api/og?title=OG%20GENERATOR&subtitle=Dynamic%20OpenGraph%20Images&icon=image&theme=magenta"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-mono antialiased bg-black overflow-x-hidden`}>
        <MatrixBackground />
        <CRTOverlay />
        <div className="relative z-10">{children}</div>
        <NeuralCursor />
      </body>
    </html>
  );
}
