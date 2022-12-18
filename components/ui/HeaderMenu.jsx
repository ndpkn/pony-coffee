import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import styles from '../../styles/HeaderMenu.module.scss'

const HeaderMenu = ({headerItems}) => {
    const router = useRouter();

    return (
            <div className={styles.overlay}>
                <div className={styles.menu}>
                    {headerItems.map((item, i) => {
                        return <Link className={router.pathname == `${item.href}` ? `${styles.link_active}` : `${styles.link}`} key={i} href={item.href}>{item.text}</Link>
                        })
                    }
                </div>
            </div>
    )
}

export default HeaderMenu