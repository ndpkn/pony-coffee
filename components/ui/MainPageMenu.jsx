import styles from '../../styles/MainPage.module.scss'
import menu1 from '../../images/menu1.png'
import menu2 from '../../images/menu2.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { motion } from 'framer-motion'
import MotionBlock from './MotionBlock';


const imagesLinks = [
    {src: menu2, alt: 'coffeePot'},
    {src: menu1, alt: 'coffeePot2'},
]

const MainPageMenu = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    const images = imagesLinks.map((image, i) => {
        return (
            <div key={i}>
                <Image style={{borderRadius:'2rem', margin: '0 auto'}} src={image.src} alt={image.alt}/>
            </div>
        )
    })
    return (
        <div className={styles.main_menu}
            id='menu'>
            <h2>меню</h2>
            <MotionBlock>
                <Slider {...settings}>
                    {images}
                </Slider>
            </MotionBlock>
        </div>
    )
}

export default MainPageMenu