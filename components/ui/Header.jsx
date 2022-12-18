import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import styles from '../../styles/Header.module.scss'
import Image from 'next/image'
import burger from '../../images/burger.png'
import closeBurger from '../../images/menu-close.png'
import qrcode from '../../images/qrcode.png'
import { useRouter } from "next/router"
import HeaderMenu from '../ui/HeaderMenu'

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
            <div className={styles.header_block}>
                <Image className={styles.header_block_logo} src={qrcode} alt="logo"/>
                <button 
                    className={styles.header_block_button} 
                    onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <Image src= {closeBurger} alt='burger menu close'/> : <Image src= {burger} alt='burger menu'/>}
                </button>
            </div>
            {isOpen ? <HeaderMenu headerItems={header}/> : null}
        </header>
    )
}

export default Header