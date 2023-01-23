import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from '../../styles/HeaderMenu.module.scss'

const HeaderMenu = () => {
    const router = useRouter();
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
                setHeader(data.data.header)
                // console.log(data.data.header);
            })
            .catch(err => console.log(err))
    }, [])

    return (
            <div className={styles.overlay}>
                <div className={styles.menu}>
                    {header.map((item, i) => {
                        return <Link className={router.pathname == `${item.href}` ? `${styles.link_active}` : `${styles.link}`} key={i} href={item.href}>{item.text}</Link>
                        })
                    }
                </div>
                {/* пустое место для закрытия меню */}
                <div style={{height: '100%'}}></div> 
            </div>
    )
}

export default HeaderMenu