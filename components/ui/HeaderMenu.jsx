import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import PonyService from '../../services/PonyServices'
import styles from '../../styles/HeaderMenu.module.scss'
import ErrorMessage from '../../components/ui/ErrorMessage'
import LoadingMessage from '../../components/ui/LoadingMessage'


const HeaderMenu = () => {
    const router = useRouter();
    const [header, setHeader] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    
    const ponyService = new PonyService()

    useEffect(() => {
        ponyService.getHeader()
                        .then(onHeaderLoaded)
                        .catch(onError)
        },[])
    //данные загружены успешно
    const onHeaderLoaded = (headerList) => {
        setHeader(headerList)
        setLoading(false)
    }

    //при загрузке произошла ошибка
    const onError = () => {
        setError(true)
        setLoading(false)
    }
    
    const items = header.map((item, i) => {
                    return <Link className={router.pathname == `${item.href}` ? `${styles.link_active}` : `${styles.link}`} 
                                    key={i} 
                                    href={item.href}>
                                        {item.text}
                            </Link>
                    })
    
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? items : null

return (
            <div className={styles.overlay}>
                <div className={styles.menu}>
                    {errorMessage}
                    {spinner}
                    {content}
                </div>
                {/* пустое место для закрытия меню */}
                <div style={{height: '100%'}}></div> 
            </div>
    )
}

export default HeaderMenu