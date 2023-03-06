import styles from '../../styles/MainPage.module.scss'
import newsPhoto1 from '../../images/news_photo.svg'
import newsCup from '../../images/news_cup.svg'
import Slider from "react-slick";
import Image from 'next/image'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MotionBlock from '../ui/MotionBlock'



const news = [
    {text:'10 стакан бесплатно', buttonText: 'смотреть меню'},
    {text:'1 стакан бесплатно', buttonText: 'смотреть меню'},
    {text:'6 стакан бесплатно', buttonText: 'смотреть меню'}
]
const MainPageNews = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000

    }
    const newsRender = news.map((item, i) => {
        return (
            <div 
                key={i} 
                className={styles.main_news_block}>
                <Image src={newsPhoto1} alt={'cup of coffee'} className={styles.main_news_block_image}/>
                <div className={styles.main_news_block_content}>
                    <div className={styles.main_news_block_content_text}>
                        <p>{item.text} <br/> <span>69</span> <span style={{color:'#000', fontSize:'1.2rem'}}>рублей</span></p>
                        <Image src={newsCup} alt={'cup of coffee'} className={styles.main_news_block_content_text_image}/>
                    </div>
                    <button style={{fontSize:'1.3rem'}} className={styles.main_button}>{item.buttonText}</button>
                </div>
            </div>
        )
    })

    return (
        <div
            className={styles.main_news}>
            <h2>Акции и новости</h2>
            <MotionBlock>
                <Slider {...settings}>
                    {newsRender}
                </Slider>
            </MotionBlock>
        </div>

    )
}

export default MainPageNews