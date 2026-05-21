import "../styles/globals.scss";

import { Noto_Sans } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

import Analytics from "../components/layout/Analytics";
import Providers from "../components/providers/Providers";
import { GA_MEASUREMENT_ID } from "../utils/gtag";

const font = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'system';if(t==='system'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          }}
        />
        <Script
          id="gtag-manager"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
