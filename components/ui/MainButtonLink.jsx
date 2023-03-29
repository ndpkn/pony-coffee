import Link from 'next/link'
import React from 'react'
import styles from '../../styles/MainButton.module.scss'

const MainButtonLink = ({buttonName, action, href, onClick}) => {
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
        case 'success' : 
        colorChange = '#41A85F';
        break
        default: 
            colorChange = '#0082FF';
    }
    return (
        <div style={{
                display:'flex', 
                justifyContent:'center',
            }}>
            <Link 
                href={href} 
                className={styles.button} 
                style={{color:`${colorChange}`}}
                onClick={onClick}
            >
                <p>{buttonName}</p>
            </Link>

        </div>
    )
}

export default MainButtonLink