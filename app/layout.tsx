import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cinzel, Inter, JetBrains_Mono } from "next/font/google";
import { siteMetadata } from "@/data/site";
import { cn } from "@/lib/cn";
import { DEFAULT_LOCALE, localeInitScript } from "@/lib/i18n";
import { themeInitScript } from "@/lib/theme";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { MotionProvider } from "@/providers/MotionProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  description: siteMetadata.description[DEFAULT_LOCALE],
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      className={cn(cinzel.variable, inter.variable, jetbrainsMono.variable)}
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
