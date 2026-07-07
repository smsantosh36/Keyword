import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  metadataBase: new URL("https://freekeyword.vercel.app"),
  title: "KeywordRadar — SEO Keyword Suggestion Tool",
  description: "Google Autocomplete-based keyword research tool with volume, difficulty aur CPC estimates.",
  openGraph: {
    title: "KeywordRadar — SEO Keyword Suggestion Tool",
    description: "Google Autocomplete-based keyword research tool with volume, difficulty aur CPC estimates.",
    url: "https://freekeyword.vercel.app",
    siteName: "KeywordRadar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Keyword — SEO Keyword Suggestion Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"></meta>
        <link rel="canonical" href="https://keyword-pi.vercel.app"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="robots" content="INDEX,FOLLOW"></meta>
      </head>
      <body>{children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
