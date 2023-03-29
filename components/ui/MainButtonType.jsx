import React from 'react'
import styles from '../../styles/MainButton.module.scss'

const MainButtonType = ({buttonName, action, type, onClick}) => {
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
        <div 
            style={{flexGrow:'1', 
                    alignItems:'flex-end', 
                    display:'flex', 
                    justifyContent:'center',
                }}
            onClick={onClick}>
            <button type={type} className={styles.button} style={{color:`${colorChange}`, border: 'none'}}>
                <p>{buttonName}</p>
            </button>
        </div>
    )
}

export default MainButtonType