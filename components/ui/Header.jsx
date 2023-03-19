import { useRef, useState } from "react"
import styles from '../../styles/Header.module.scss'
import Image from 'next/image'
import burger from '../../images/burger.svg'
import closeBurger from '../../images/burger-close.svg'
import HeaderMenu from '../ui/HeaderMenu'
import logo from '../../images/logo2.svg'
import Link from "next/link"
import { motion } from 'framer-motion'
import DeleteConfirmation from "./DeleteConfirmation"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const closeMenuRef = useRef(null)
    const onCloseMenu = () => {
        setIsOpen(!isOpen)
    }

    const [openDialog, setOpenDialog] = useState(false)

    const handleOpenDialog = () => {
        onCloseMenu()
        setOpenDialog(true)
    }
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    
    return (
        <header className={styles.header}>
            <div className={styles.header_block}>
                <Link href='/'>
                    <Image priority rel="preload" as="image" className={styles.header_block_logo} src={logo} alt="logo"/>
                </Link>
                <motion.button 
                    initial={{ opacity: 1, scale: 1  }}
                    whileTap={{opacity:0.5, scale: 0.5 }}
                    exit={{ opacity: 1, scale: 1  }}
                    transition={{ duration: 0.5}}
                    className={styles.header_block_button} 
                    onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <Image src= {closeBurger} alt='burger menu close'/> : <Image src= {burger} alt='burger menu'/>}
                </motion.button>
            </div>
            {isOpen ? <HeaderMenu closeMenuRef={closeMenuRef} onCloseMenu={onCloseMenu} handleOpenDialog={handleOpenDialog}/> : null}
            <DeleteConfirmation
                handleCloseDialog={handleCloseDialog} 
                openDialog={openDialog} 
                onClick={null}
                cancel={'Отменить'}
                confirm={'Выйти'}
                href={'/logout'}
                title='Выход из аккаунта'
                description='Вы действиительно хотите выйти из этого аккаунта?'
                />
        </header>
    )
}


export default Header