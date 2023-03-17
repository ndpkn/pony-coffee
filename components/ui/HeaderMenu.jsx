import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from '../../styles/HeaderMenu.module.scss'
import ErrorMessage from '../../components/ui/ErrorMessage'
import HeaderMenuSkeleton from '../../components/ui/skeletons/HeaderMenuSkeleton'
import { useSelector } from 'react-redux';


const HeaderMenu = ({closeMenuRef, onCloseMenu}) => {
    const router = useRouter();
    const headerItems = useSelector((state) => state.headerMenu.headerMenuItems)
    const error = useSelector((state) => state.headerMenu.error)
    const loading = useSelector((state) => state.headerMenu.loading)


    const items = headerItems.map((item, i) => {
                    return  (<Link 
                                className={router.pathname == `${item.href}` ? `${styles.link_active}` : `${styles.link}`} 
                                key={i} 
                                href={item.href}>
                                    {item.text}
                            </Link>)
                        
                    })
    
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <HeaderMenuSkeleton/> : null
    const content = !(loading || error) ? items : null

return (
            <div className={styles.overlay}>
                <nav className={styles.menu}>
                    {errorMessage}
                    {spinner}
                    {content}
                </nav>
                {/* пустое место для закрытия меню */}
                <div ref={closeMenuRef} onClick={onCloseMenu} style={{height: '100%'}}></div> 
            </div>
    )
}

export default HeaderMenu