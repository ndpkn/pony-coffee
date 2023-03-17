import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../../styles/EditButton.module.scss'
import RatingBlock from '../ui/RatingBlock'

const EditButton = ({actionName, currentValue, link, grade}) => {
    return (
        <Link href={link}>
            <div className={styles.button}>
                <div className={styles.button_left}>
                    <p className={styles.button_action}>{actionName}</p>
                    <p className={styles.button_value}>{currentValue}</p>
                    {grade ? <div style={{marginTop: '1rem'}}><RatingBlock grade={grade}/></div>  : null}
                </div>
                <div className={styles.button_right}>
                    <p style={{color: '#0082FF'}}>ᐳ</p>
                    {/* <Image src={icon} alt='icon'></Image> */}
                </div>
            </div>        
        </Link>
    )
}

export default EditButton