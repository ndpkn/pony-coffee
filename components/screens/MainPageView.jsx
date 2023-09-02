import styles from '../../styles/MainPage.module.scss'
import MainPageWelcome from '../ui/MainPageWelcome'
import MainPageWelcomeTablet from '../ui/MainPageWelcomeTablet'
import MainPageNews from '../ui/MainPageNews'
import MainPageCoffeePot from '../ui/MainPageCoffeePot'
import MainPageMenu from '../ui/MainPageMenu'
import MainPageAddress from '../ui/MainPageAddress'
import MainPageReview from '../ui/MainPageReview'

import { useMediaQuery } from 'react-responsive'

const MainPageView = ({ fieldRef }) => {
	const Desktop = ({ children }) => {
		const isDesktop = useMediaQuery({ minWidth: 992 })
		return isDesktop ? children : null
	}
	const Tablet = ({ children }) => {
		const isTablet = useMediaQuery({ minWidth: 551, maxWidth: 991 })
		return isTablet ? children : null
	}
	const Mobile = ({ children }) => {
		const isMobile = useMediaQuery({ maxWidth: 550 })
		return isMobile ? children : null
	}
	// const Default = ({ children }) => {
	//     const isNotMobile = useMediaQuery({ minWidth: 768 })
	//     return isNotMobile ? children : null
	// }

	return (
		<div className={styles.main}>
			<Mobile>
				<MainPageWelcome fieldRef={fieldRef} />
			</Mobile>
			<Tablet>
				<MainPageWelcomeTablet fieldRef={fieldRef} />
			</Tablet>
			<Desktop>
				<MainPageWelcomeTablet fieldRef={fieldRef} />
			</Desktop>

			<div
				style={{
					maxWidth: '100rem',
					margin: '0 auto',
				}}
			>
				<Mobile>
					<MainPageNews
						fieldRef={fieldRef}
						slidesToShow={1}
						autoplay={false}
					/>
					<MainPageCoffeePot
						slidesToShow={1}
						dotsClass={' slick-dots slick-dots-coffeePot'}
					/>
					<MainPageAddress />
					<MainPageMenu fieldRef={fieldRef} slidesToShow={1} />
					<MainPageReview slidesToShow={1} />
				</Mobile>

				<Tablet>
					<MainPageNews
						fieldRef={fieldRef}
						slidesToShow={2.3}
						autoplay={false}
					/>
					<MainPageCoffeePot
						slidesToShow={2.5}
						infinite={false}
						dotsClass={' slick-dots '}
					/>
					<MainPageAddress />
					<MainPageMenu fieldRef={fieldRef} slidesToShow={2} />
					<MainPageReview slidesToShow={2.2} />
				</Tablet>

				<Desktop>
					<MainPageNews
						fieldRef={fieldRef}
						slidesToShow={3}
						autoplay={true}
					/>
					<MainPageCoffeePot
						slidesToShow={3}
						infinite={false}
						dotsClass={' slick-dots '}
					/>
					<MainPageAddress />
					<MainPageMenu fieldRef={fieldRef} slidesToShow={3} />
					<MainPageReview slidesToShow={3} />
				</Desktop>
			</div>
		</div>
	)
}

export default MainPageView
