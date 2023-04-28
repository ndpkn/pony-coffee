import Link from 'next/link'
import React from 'react'
import styles from '../../styles/EditButton.module.scss'
import RatingBlock from '../ui/RatingBlock'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const EditButton = ({actionName, currentValue, link, grade}) => {
    return (
        <Link 
            href={{
                pathname: link,
            }}
        
        >
            <div className={styles.button}>
                <div className={styles.button_left}>
                    <p className={styles.button_action}>{actionName}</p>
                    <p className={styles.button_value}>{currentValue}</p>
                    {grade ? <div style={{marginTop: '1rem'}}><RatingBlock grade={grade}/></div>  : null}
                </div>
                <div className={styles.button_right}>
                    <ArrowForwardIosIcon 
                        fontSize='large'
                        style={{
                            color:'#0082FF'
                        }}
                    />
                </div>
            </div>        
        </Link>
    )
}

export default EditButton