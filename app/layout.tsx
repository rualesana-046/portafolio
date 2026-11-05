import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Grenze_Gotisch, Newsreader } from "next/font/google";
import { siteMetadata } from "@/data/site";
import { cn } from "@/lib/cn";
import { DEFAULT_LOCALE, localeInitScript } from "@/lib/i18n";
import { currentSiteUrl, shouldIndex } from "@/lib/site-url";
import { themeInitScript } from "@/lib/theme";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { MotionProvider } from "@/providers/MotionProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

const grenze = Grenze_Gotisch({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-grenze",
  display: "swap",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const title = siteMetadata.title[DEFAULT_LOCALE];
const description = siteMetadata.description[DEFAULT_LOCALE];

export const metadata: Metadata = {
  metadataBase: currentSiteUrl(),
  title,
  description,
  alternates: { canonical: siteMetadata.canonicalPath },
  openGraph: {
    type: siteMetadata.openGraphType,
    locale: siteMetadata.openGraphLocale,
    url: siteMetadata.canonicalPath,
    title,
    description,
  },
  twitter: { card: siteMetadata.twitterCard, title, description },
  icons: {
    icon: { url: siteMetadata.faviconPath, type: siteMetadata.faviconType },
    apple: `${siteMetadata.appIconRoute}/${siteMetadata.appleIconSize}`,
  },
  robots: shouldIndex(siteMetadata.isIndexable, process.env.VERCEL_ENV)
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      className={cn(grenze.variable, newsreader.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `${themeInitScript}${localeInitScript}` }} />
      </head>
      <body>
        <ThemeProvider>
          <LocaleProvider documentTitle={siteMetadata.title}>
            <MotionProvider>{children}</MotionProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
