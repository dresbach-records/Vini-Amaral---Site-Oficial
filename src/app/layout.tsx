import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant'
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair'
});

const oswald = Oswald({ 
  subsets: ["latin"], 
  weight: ['200', '300', '400', '500'],
  variable: '--font-oswald'
});

const jetbrains = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700'],
    variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: "Vini Amaral | Artista do Rock Melódico",
  description: "Músicas que falam o que você sente mas nunca soube dizer.",
  manifest: "/manifest.json",
  themeColor: "#C9A84C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${cormorant.variable} ${playfair.variable} ${oswald.variable} ${jetbrains.variable}`}>{children}</body>
    </html>
  );
}
