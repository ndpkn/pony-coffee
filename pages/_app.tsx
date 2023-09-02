import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import store from '../store'
import { AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()
	return (
		<Provider store={store}>
			<AnimatePresence>
				<Component {...pageProps} key={router.pathname} />
			</AnimatePresence>
		</Provider>
	)
}
