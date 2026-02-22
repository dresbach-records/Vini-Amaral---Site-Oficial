import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://vinicius-amaral-portfolio.web.app"),
  title: "Vini Amaral - Site Oficial",
  description: "Site oficial de Vini Amaral, um cantor e compositor brasileiro de rock melódico.",
  keywords: "Vini Amaral, rock melódico, música, compositor brasileiro, rock nacional",
  authors: [{ name: "Vini Amaral" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Vini Amaral - Nobody Knows",
    description: "Ouça o novo álbum de Vini Amaral, 'Nobody Knows', uma jornada pelo rock melódico.",
    images: [{ url: "/images/album-cover.jpg" }],
    url: "https://vinicius-amaral-portfolio.web.app/",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vini Amaral - Nobody Knows",
    description: "Ouça o novo álbum de Vini Amaral, 'Nobody Knows'.",
    images: ["/images/album-cover.jpg"],
  },
};

export const viewport: Viewport = {
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
