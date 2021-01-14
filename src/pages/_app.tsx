import type { AppProps } from 'next/app'
import 'global_styles/index.sass'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
