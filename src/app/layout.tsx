
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display, Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

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
  title: "Vini Amaral | Melodic Rock 80s",
  description: "Vini Amaral - Melodic Rock inspirado nos anos 80. Ouça agora no SoundCloud.",
  keywords: "Vini Amaral, rock melódico, música, 80s, anos 80, compositor brasileiro, rock nacional, soundcloud",
  authors: [{ name: "Vini Amaral" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Vini Amaral | Melodic Rock 80s",
  },
  other: {
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#C9A84C",
      "msapplication-TileImage": "icons/icon-144.png",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icons/icon-152.png",
  },
  openGraph: {
    title: "Vini Amaral | Melodic Rock 80s",
    description: "Vini Amaral - Melodic Rock inspirado nos anos 80. Ouça agora no SoundCloud.",
    images: [{ url: "/images/album-cover.jpg" }],
    url: "https://vinicius-amaral-portfolio.web.app/",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vini Amaral | Melodic Rock 80s",
    description: "Vini Amaral - Melodic Rock inspirado nos anos 80. Ouça agora no SoundCloud.",
    images: ["/images/album-cover.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MB1E5RMJ4V"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MB1E5RMJ4V');
              gtag('config', 'AW-17972293044');
            `,
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${playfair.variable} ${oswald.variable} ${jetbrains.variable}`}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker
                    .register('/sw.js')
                    .then(reg => console.log('SW registrado:', reg.scope))
                    .catch(err => console.log('SW erro:', err));
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
