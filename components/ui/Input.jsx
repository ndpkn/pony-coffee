import React from 'react'
import styles from '../../styles/Input.module.scss'
import eyeOpen from '../../images/eye.svg'
import eyeClose from '../../images/eyeHide.svg'
import Image from 'next/image'

const Input = ({type, placeholder, onChange, name, ref, minLength, pattern, value, isShowPass, isShow}) => {

    return (
        <div className={styles.input_block} >
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
            {name == 'password' || name == 'password_confirmation'
            ?   <span 
                    className={styles.input_span}
                    onClick={isShowPass}>
                        {isShow 
                        ? <Image src={eyeClose} alt="eye" width={30} height={30} style={{cursor: 'pointer'}} />
                        : <Image src={eyeOpen} alt="eye" width={30} height={30} style={{cursor: 'pointer'}}/>
                        }
                </span>
            : null}
        </div>
        
    )
}

export default Input