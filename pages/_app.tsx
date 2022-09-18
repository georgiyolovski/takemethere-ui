import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '../src/context/AuthContext';
import createEmotionCache from '../src/theme/createEmotionCache';
import theme from '../src/theme/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface IMyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: IMyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <GoogleOAuthProvider
      clientId={
        '27497645030-8m09bgm6vpleibfqdg06u4bq8aid4n6e.apps.googleusercontent.com'
      }
    >
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Take Me There</title>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </AuthProvider>
        </ThemeProvider>
      </CacheProvider>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
