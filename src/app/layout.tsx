import type { Metadata, Viewport } from "next";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { SITE } from "@/lib/site";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jb",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-TXH0Q2477K';

  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
