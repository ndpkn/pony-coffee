import { useRef, useState } from "react"
import styles from '../../styles/Header.module.scss'
import Image from 'next/image'
import burger from '../../images/burger.svg'
import closeBurger from '../../images/burger-close.svg'
import HeaderMenu from '../ui/HeaderMenu'
import logo from '../../images/logo2.svg'
import Link from "next/link"
import { motion } from 'framer-motion'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false) //добавить состояние в редакс и закрывать меню по клику на пустое место
    const closeMenuRef = useRef(null)
    const onCloseMenu = () => {
        setIsOpen(!isOpen)
    }
    
    return (
        <header className={styles.header}>
            <div className={styles.header_block}>
                <Link href='/'>
                    <Image priority rel="preload" as="image" className={styles.header_block_logo} src={logo} alt="logo"/>
                </Link>
                <motion.button 
                    initial={{ opacity: 1, scale: 1  }}
                    whileTap={{opacity:0, scale: 0.1 }}
                    transition={{ duration: 0.5}}
                    className={styles.header_block_button} 
                    onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <Image src= {closeBurger} alt='burger menu close'/> : <Image src= {burger} alt='burger menu'/>}
                </motion.button>
            </div>
            {isOpen ? <HeaderMenu closeMenuRef={closeMenuRef} onCloseMenu={onCloseMenu}/> : null}
        </header>
    )
}


export default Header