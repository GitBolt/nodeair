import { ComponentType } from 'react';
import '@/styles/globals.scss'

type Props = {
  Component: ComponentType<any>
  pageProps: any
}

function App({ Component, pageProps }: Props) {
  return <Component {...pageProps} />
}

export default App
