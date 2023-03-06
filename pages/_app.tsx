import '../styles/globals.scss'
import type { AppProps } from 'next/app'
// import { AnimatePresence , motion} from 'framer-motion'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import store from '../store'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
