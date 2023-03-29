import Image from 'next/image'
import cup from '../../images/TabletWelcome.svg'
import ellips from '../../images/EllipseWelcome.svg'
import styles from '../../styles/MainPage.module.scss'
import { motion } from 'framer-motion'

const MainPageWelcomeTablet = ({fieldRef}) => {
    const goToMenu = () => {
        fieldRef.current.scrollIntoView()
    }
    return (
        <div className={styles.main_welcome}>
            <div style={{
                position: 'relative',
                height:'100%'
                // maxWidth: '100rem',
                // width: '100rem',
                // margin: '0 auto'
            }}>
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
                    <Image 
                    className={styles.main_welcome_cup} 
                    src={cup} 
                    alt={'cup of coffee'}
                    />
                    <Image 
                        className={styles.main_welcome_ellips} 
                        src={ellips} 
                        alt={'ellips'} 
                        width='auto'
                    />
                </div>
            </div>
        </div>

    )
}

export default MainPageWelcomeTablet