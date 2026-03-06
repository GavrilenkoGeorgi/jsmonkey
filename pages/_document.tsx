import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Script
            id="netlify-manager"
            strategy="afterInteractive"
            src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          />
          <Script
            id="gtag-manager"
            strategy="afterInteractive"
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-NHDRDGHWQ9"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-NHDRDGHWQ9', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
          <Script
            id="netlify-ident"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.on('init', user => {
                  if (!user) {
                    window.netlifyIdentity.on('login', () => {
                      document.location.href = '/admin/';
                    });
                  }
                });
              }
          `,
            }}
          />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem('theme')||'system';if(t==='system'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
