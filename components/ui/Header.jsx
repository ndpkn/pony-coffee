import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import styles from '../../styles/Header.module.scss'
import Image from 'next/image'
import burger from '../../images/burger.png'
import closeBurger from '../../images/menu-close.png'
import qrcode from '../../images/qrcode.png'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [header, setHeader] = useState([])
    
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/header', {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(({data}) => {
                setHeader(data)
            })
    }, [])
    
    return (
        <header className={styles.header}>
            <button
                className={styles.header_button}>
                    <Image src={qrcode} alt='qr code'/>
            </button>
            <button 
                className={styles.header_button} 
                onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <Image src= {closeBurger} alt='burger menu close'/> : <Image src= {burger} alt='burger menu'/>}
            </button>
            <div className={isOpen ? styles.header_menu_open : styles.header_menu}>
                {header.map((item, i) => {
                    return <Link key={i} href={item.href}>{item.text}</Link>
                    })
                }
            </div>
        </header>
    )
}

export default Header