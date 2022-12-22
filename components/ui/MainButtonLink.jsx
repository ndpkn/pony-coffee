import Link from 'next/link'
import React from 'react'
import styles from '../../styles/MainButton.module.scss'

const MainButtonLink = ({buttonName, action, href}) => {
    let colorChange
    switch (action) {
        case 'danger' : 
            colorChange = '#ED2222';
            break
        case 'warning' : 
            colorChange = '#FFA700';
            break
        case 'confirm' : 
            colorChange = '#0082FF';
            break
        default: 
            colorChange = '#0082FF';
    }
    return (
        <div style={{flexGrow:'1', alignItems:'flex-end', display:'flex', justifyContent:'center'}}>
            <Link href={href} className={styles.button} style={{color:`${colorChange}`}}>
                {buttonName}
            </Link>

        </div>
    )
}

export default MainButtonLink