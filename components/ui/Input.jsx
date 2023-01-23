import React from 'react'
import styles from '../../styles/Input.module.scss'

const Input = ({type, placeholder, onChange, name, ref, minLength, pattern, value}) => {
    return (
            <input 
                name={name}
                className={styles.input} 
                type={type} 
                placeholder={placeholder}
                onChange={onChange}
                ref={ref}
                value={value}
                minLength={minLength}
                pattern={pattern}/>
        
    )
}

export default Input