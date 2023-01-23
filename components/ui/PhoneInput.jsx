import React from 'react'
import InputMask from 'react-input-mask'
import styles from '../../styles/Input.module.scss'

const PhoneInput = ({type, placeholder, onChange, name, ref, minLength, pattern, value}) => {
    return (
        <InputMask mask="+79999999999" value={value} onChange={onChange}>
            {(inputProps) => <input 
                {...inputProps}
                name={name}
                className={styles.input} 
                type={type} 
                placeholder={placeholder}
                onChange={onChange}
                ref={ref}
                minLength={minLength}
                pattern={pattern}/>}
        </InputMask>
        
    )
}

export default PhoneInput