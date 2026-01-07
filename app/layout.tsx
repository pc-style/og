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
