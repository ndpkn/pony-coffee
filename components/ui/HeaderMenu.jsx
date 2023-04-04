import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from '../../styles/HeaderMenu.module.scss'
import ErrorMessage from '../../components/ui/ErrorMessage'
import HeaderMenuSkeleton from '../../components/ui/skeletons/HeaderMenuSkeleton'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';


const HeaderMenu = ({closeMenuRef, onCloseMenu, handleOpenDialog, isOpen}) => {
    const router = useRouter();
    const headerItems = useSelector((state) => state.headerMenu.headerMenuItems)
    const error = useSelector((state) => state.headerMenu.error)
    const loading = useSelector((state) => state.headerMenu.loading)
    const notifCount = useSelector((state) => state.headerMenu.notifCounter)
    // const notifCounter = 3
    const items = headerItems.map((item, i) => {
                    return  (
                            <Link 
                                className={router.pathname.includes(`${item.href}`) && item.href != '/' ? `${styles.link_active}` : `${styles.link}`} 
                                key={i} 
                                href={item.href != '/logout' ? `${item.href}` : ''}
                                onClick={item.href == '/logout' ? handleOpenDialog : null}
                                >
                                    {item.text} 
                                    {notifCount !== 0 && item.href == '/notifications' 
                                    ? 
                                    <span className={router.pathname.includes(`/notifications`) ? styles.link_active_counter : styles.link_counter}>{notifCount}</span> 
                                    : 
                                    null
                                    }
                            </Link>
                        )
                    })
    
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <HeaderMenuSkeleton/> : null
    const content = !(loading || error) ? items : null

return (
    <motion.div 
        className={styles.overlay}>
        <nav className={styles.menu}>
            {errorMessage}
            {spinner}
            {content}
        </nav>
        {/* пустое место для закрытия меню */}
        <div 
            ref={closeMenuRef} 
            onClick={onCloseMenu}
            className={styles.overlay_closeField}
        >
        </div> 
    </motion.div>
    )
}

export default HeaderMenu