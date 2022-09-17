import createEmotionServer from '@emotion/server/create-instance';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import createEmotionCache from '../src/theme/createEmotionCache';
import theme from '../src/theme/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link rel='shortcut icon' href='/logo/png/tmd_logo_no_text.png' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
          <meta name='emotion-insertion-point' content='' />
          {/* PWA configs */}
          <link rel='manifest' href='/manifest.json' />
          <link
            rel='apple-touch-icon'
            href='/logo/png/tmd_logo.png'
            type='image/png'
          />
          <meta name='theme-color' content='#fff' />

          <style
            dangerouslySetInnerHTML={{
              __html: `
              /* bengali */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 300;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_z4rqWc-Eoo8JzGiI3P9WeVkIJXA.woff2) format('woff2');
                unicode-range: U+0964-0965, U+0981-09FB, U+200C-200D, U+20B9, U+25CC;
              }
              /* latin-ext */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 300;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_z4rqWc-Eoo8JzGj43P9WeVkIJXA.woff2) format('woff2');
                unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
              }
              /* latin */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 300;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_z4rqWc-Eoo8JzGjA3P9WeVkI.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
              /* bengali */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 400;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_84rqWc-Eoq3tRDx0VMv-kXw.woff2) format('woff2');
                unicode-range: U+0964-0965, U+0981-09FB, U+200C-200D, U+20B9, U+25CC;
              }
              /* latin-ext */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 400;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_84rqWc-Eoq2dRDx0VMv-kXw.woff2) format('woff2');
                unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
              }
              /* latin */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 400;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_84rqWc-Eoq2lRDx0VMv8.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
              /* bengali */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 500;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_z4rqWc-Eoo5pyGiI3P9WeVkIJXA.woff2) format('woff2');
                unicode-range: U+0964-0965, U+0981-09FB, U+200C-200D, U+20B9, U+25CC;
              }
              /* latin-ext */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 500;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_z4rqWc-Eoo5pyGj43P9WeVkIJXA.woff2) format('woff2');
                unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
              }
              /* latin */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 500;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_z4rqWc-Eoo5pyGjA3P9WeVkI.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
              /* bengali */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 600;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_z4rqWc-Eoo7Z1GiI3P9WeVkIJXA.woff2) format('woff2');
                unicode-range: U+0964-0965, U+0981-09FB, U+200C-200D, U+20B9, U+25CC;
              }
              /* latin-ext */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 600;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_z4rqWc-Eoo7Z1Gj43P9WeVkIJXA.woff2) format('woff2');
                unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
              }
              /* latin */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 600;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_z4rqWc-Eoo7Z1GjA3P9WeVkI.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
              /* bengali */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 700;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_z4rqWc-Eoo9J0GiI3P9WeVkIJXA.woff2) format('woff2');
                unicode-range: U+0964-0965, U+0981-09FB, U+200C-200D, U+20B9, U+25CC;
              }
              /* latin-ext */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 700;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_z4rqWc-Eoo9J0Gj43P9WeVkIJXA.woff2) format('woff2');
                unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
              }
              /* latin */
              @font-face {
                font-family: 'Atma';
                font-style: normal;
                font-weight: 700;
                src: url(https://fonts.gstatic.com/s/atma/v15/uK_z4rqWc-Eoo9J0GjA3P9WeVkI.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
          `,
            }}
          />
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
