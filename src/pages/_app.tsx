import type { AppProps } from 'next/app';
import 'global_styles/index.scss';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
