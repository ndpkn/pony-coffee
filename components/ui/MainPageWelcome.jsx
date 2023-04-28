import Image from 'next/image'
import glass from '../../images/mainPageCoffee.svg'
import ellips from '../../images/EllipseWelcome.svg'
import styles from '../../styles/MainPage.module.scss'
import { motion } from 'framer-motion'

const MainPageWelcome = ({fieldRef}) => {
    const goToMenu = () => {
        fieldRef.current.scrollIntoView()
    }
    return (
        <div className={styles.main_welcome}>
            <div className={styles.main_welcome_content}>
                <motion.h1
                    initial={{
                        opacity: 0, 
                        scale: 0.5 
                    }}
                    animate={{
                        opacity: 1, 
                        scale: 1 
                        
                    }}
                    transition={{ 
                        duration: 0.5, 
                        delay: 0.5
                    }}
                >
                    Pony Coffee
                </motion.h1>
                <motion.button 
                    initial={{
                        opacity: 0, 
                        scale: 0.5 
                    }}
                    animate={{
                        opacity: 1, 
                        scale: 1
                        
                    }}
                    transition={{ 
                        duration: 0.5,
                        delay: 0.7
                    }}
                    style={{
                        marginRight:'2rem'
                    }} 
                    className={styles.main_button}
                    onClick={goToMenu}
                    >
                    смотреть меню
                </motion.button>
            </div>
            <motion.div 
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                    
                }}
                transition={{ 
                    duration: 1,
                    delay: 0.6
                }}
                className={styles.marquee_container}>
                <p className={styles.marquee}>
                    кофе на бегу  &bull;  кофе на бегу  &bull;  кофе на бегу  &bull;  кофе на бегу  &bull;  кофе на бегу  &bull;  кофе на бегу  &bull;
                </p>
            </motion.div>
            <Image 
                className={styles.main_welcome_ellips} 
                src={ellips} 
                alt={'ellips'} 
                width='auto'
            />
            <Image 
                width='auto' 
                className={styles.main_welcome_cup} 
                src={glass} 
                alt={'cup of coffee'}
                />
        </div>

    )
}

export default MainPageWelcome