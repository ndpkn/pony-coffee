import { useRef, useState } from "react"
import styles from '../../styles/Header.module.scss'
import Image from 'next/image'
import burger from '../../images/burger.svg'
import closeBurger from '../../images/burger-close.svg'
import HeaderMenu from '../ui/HeaderMenu'
import logo from '../../images/ponyIcon.svg'
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
                    <Image priority rel="preload" as="image" className={styles.header_block_logo} src={logo} alt="logo" height={40}/>
                </Link>
                <motion.button 
                    key='button'
                    initial={{ opacity: 1, scale: 1  }}
                    whileTap={{opacity:0.5, scale: 0.5 }}
                    exit={{ opacity: 1, scale: 1  }}
                    transition={{ duration: 0.5}}
                    className={styles.header_block_button} 
                    onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <Image src= {closeBurger} alt='burger menu close'/> : <Image src= {burger} alt='burger menu'/>}
                </motion.button>
            </div>
            {isOpen 
            &&
            <motion.div
                className="superclass"
                key='header'
                animate={{
                    opacity: 1,
                    transition: {
                        duration: 0.3
                    }
                }}
                initial={{
                    opacity: 0,
                    
                }}
                exit={{
                    opacity: 0,
                    transition: {
                        duration: 0.3
                    }
                }} 
                >
                <HeaderMenu 
                    closeMenuRef={closeMenuRef} 
                    onCloseMenu={onCloseMenu} 
                    handleOpenDialog={handleOpenDialog} 
                    isOpen={isOpen}
                />  
            </motion.div>
            }


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