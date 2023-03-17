import styles from '../../styles/MainPage.module.scss'
import Slider from "react-slick";
import Image from 'next/image'
import newsPhoto1 from '../../images/news_photo.svg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RatingBlock from '../ui/RatingBlock'
import AddressBlock from '../ui/AddressBlock'
import vector from '../../images/Vector.svg'
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion'
import MotionBlock from './MotionBlock';


const reviews = [
    {name: 'Алексей', text:'Всё понравилось, обслуживание на уровне! хочется возвращаться снова и снова! ', img: newsPhoto1, grade: 5, address: 'Ворошиловский просп., 79', date:'22.03.23'},
    {name: 'Дмитрий', text:'Очень понравилось у вас приду еще',  grade: 5, address: 'Ворошиловский просп., 79', date:'22.03.23'},
    {name: 'Иван', text:'Все супер, спасибо вам', img: newsPhoto1, grade: 5, address: 'Ворошиловский просп., 79', date:'22.03.23'}
]
const MainPageReview = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000

    }
    const reviewsRender = reviews.map((review, i) => {
        return (
            <div key={i} className={styles.main_review_item}>
                <p style={{fontWeight:'500', fontSize:'1.5rem', marginBottom:'0.5rem'}}>{review.name}</p>
                <p style={{fontWeight:'400', fontSize:'1.5rem', color:'rgba(0, 0, 0, 0.56)', marginBottom:'1rem'}}>{review.text}</p>
                {review.img ? 
                <Image className={styles.main_review_item_img} src={review.img} alt='photo review'/> : 
                null}
                {review.grade ? 
                <RatingBlock grade={review.grade}/> : 
                null}
                {review.address ? 
                <AddressBlock address={review.address}/>: 
                null}
                <p style={{fontSize:'1rem', color:'rgba(0, 0, 0, 0.3)', marginTop:'0.5rem', textAlign:'right'}}>{review.date}</p>
            </div>
        )
    })

    return (
        <motion.div 
            
            className={styles.main_review}>
            <h2>наши отзывы</h2>
            <MotionBlock>
                <Slider {...settings}>
                    {reviewsRender}
                </Slider>
            </MotionBlock>
            <Image 
                src={vector} 
                alt='vector' 
                style={{
                    position:'absolute', 
                    top:'-10%', 
                    zIndex:'-1',
                    right: 0,
                    width: '100%'
                    }}/>
            <div style={{marginTop:'8rem'}}>
                <Link href={'/feedback'} className={styles.main_review_link}>
                    <ArrowForwardIcon sx={{color: '#0080FF'}} fontSize="large" /> 
                    Оставь свой отзыв 
                </Link>
            </div>
        </motion.div>
    )
}

export default MainPageReview