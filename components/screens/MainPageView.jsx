import styles from '../../styles/MainPage.module.scss'
import MainPageWelcome from '../ui/MainPageWelcome'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainPageNews from '../ui/MainPageNews'
import MainPageCoffeePot from '../ui/MainPageCoffeePot'
import MainPageMenu from '../ui/MainPageMenu'
import MainPageAddress from '../ui/MainPageAddress'
import MainPageReview from '../ui/MainPageReview'

const MainPageView = ({fieldRef}) => {
    return (
        <div className={styles.main}>
            <MainPageWelcome fieldRef={fieldRef}/>
            <MainPageNews fieldRef={fieldRef}/>
            <MainPageCoffeePot/>
            <MainPageMenu fieldRef={fieldRef}/>
            <MainPageAddress/>
            <MainPageReview/>
        </div>
    )
}

export default MainPageView