import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../../styles/EditButton.module.scss'

const InputEditButton = ({actionName, currentValue, onChange, inputName}) => {
    return (
        <div className={styles.button}>
            <div style={{
                width:'90%'
            }}>
                <p className={styles.button_action}>{currentValue}</p>
                <input 
                    className={styles.button_input} 
                    type="text" 
                    placeholder={actionName}
                    name={inputName}
                    onChange={onChange} />
                {/* <p className={styles.button_value}>{}</p> */}
            </div>
        </div>        
    )
}

export default InputEditButton