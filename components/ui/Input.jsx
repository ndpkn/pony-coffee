import React from 'react'
import styles from '../../styles/Input.module.scss'

const Input = ({type, placeholder, onChange, name}) => {
    return (
            <input 
                name={name}
                className={styles.input} 
                type={type} 
                placeholder={placeholder}
                onChange={onChange}/>
        
    )
}

export default Input