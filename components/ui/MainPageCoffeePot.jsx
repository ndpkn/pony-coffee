import styles from '../../styles/MainPage.module.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import coffeePotImg from '../../images/coffeePot.png'
import { motion } from 'framer-motion'
import MotionBlock from './MotionBlock';
import MotionBlockHeader from './MotionBlockHeader';


const imagesLinks = [
    {src: coffeePotImg, alt: 'coffeePot'},
    {src: coffeePotImg, alt: 'coffeePot2'},
    {src: coffeePotImg, alt: 'coffeePot3'},
    {src: coffeePotImg, alt: 'coffeePot3'},
    {src: coffeePotImg, alt: 'coffeePot3'}
]

const MainPageCoffeePot = ({slidesToShow, infinite, dotsClass}) => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: infinite,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplaySpeed: 4000,
        dotsClass: dotsClass
    }
    const images = imagesLinks.map((image, i) => {
        return (
            <div key={i}>
                <Image style={{borderRadius:'2rem', margin: '0 auto'}} src={image.src} alt={image.alt}/>
            </div>
        )
    })
    return (
        <div className={styles.main_coffeePot}>
            {/* <h2><span>Кофейни</span> Pony Coffee</h2> */}
            <MotionBlockHeader textSpan={'Кофейни '} text={'Pony Coffee'}/>
            <MotionBlock>
                <Slider {...settings}>
                    {images}
                </Slider>
            </MotionBlock>
        </div>
    )
}

export default MainPageCoffeePot