import "./globals.css";

export const metadata = {
  title: "KeywordRadar — SEO Keyword Suggestion Tool",
  description: "Google Autocomplete-based keyword research tool with volume, difficulty aur CPC estimates.",
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
      <body>{children}</body>
    </html>
  );
}
