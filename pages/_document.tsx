import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang='en'>
        <Head>
          <script
            id='netlify-widget'
            async
            src='https://identity.netlify.com/v1/netlify-identity-widget.js'
            />
          <script
            id='gtag-manager'
            async
            src='https://www.googletagmanager.com/gtag/js?id=G-NHDRDGHWQ9'
          />
          <script
            id='google-analytics'
            async
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-NHDRDGHWQ9', {
                  page_path: window.location.pathname,
                });
              `
            }}
          />
          <script
            id='netlify-ident'
            async
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
            `}}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
