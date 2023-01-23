import { useEffect, useState } from "react"
import axios from "axios"
import styles from '../../styles/Header.module.scss'
import Image from 'next/image'
import burger from '../../images/burger.svg'
import closeBurger from '../../images/burger-close.svg'
import HeaderMenu from '../ui/HeaderMenu'
import logo from '../../images/logo.svg'
import Link from "next/link"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false) //добавить состояние в редакс и закрывать меню по клику на пустое место

    
    return (
        <header className={styles.header}>
            <div className={styles.header_block}>
                <Link href='/'>
                    <Image className={styles.header_block_logo} src={logo} alt="logo" priority/>
                </Link>
                <button 
                    className={styles.header_block_button} 
                    onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <Image src= {closeBurger} alt='burger menu close'/> : <Image src= {burger} alt='burger menu'/>}
                </button>
            </div>
            {isOpen ? <HeaderMenu/> : null}
        </header>
    )
}


export default Header