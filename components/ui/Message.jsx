import { Rating } from '@mui/material'
import React from 'react'
import styles from '../../styles/Message.module.scss'

const Message = ({position, text, grade, coffeePot, time}) => {
    return (
        <div className={position === 'left' ? `${styles.left}` : `${styles.right}`}>
            <div>
                <p 
                    style={{
                            fontSize:'1.3rem', 
                            color: 'rgba(0, 0, 0, 0.5)',
                            marginRight: '1rem',
                            marginBottom: '1rem'
                            
                        }}>
                    {text}
                </p>
                {grade ? <RatingBlock grade={grade}/> : null}
                {coffeePot ? <AddressBlock coffeePot={coffeePot}/>: null}
            </div>
            <p className={position === 'left' ? `${styles.left_time}`: `${styles.right_time}`}>
                {time}
            </p>
        </div>
    )
}

const  RatingBlock = ({grade}) => {
    return(
        <p style={{fontSize:'1.1rem', color: '#0082FF'}}>
            Оценка: 
                <Rating
                    name="read-only"
                    style={{fontSize: '1rem', marginLeft: '1rem'}}
                    value={grade}
                    readOnly
                />
        </p>
    )
}
const  AddressBlock = ({coffeePot}) => {
    return(
        <p style={{
            fontSize:'1.1rem', 
            color: '#0082FF',
            marginRight: '1rem'
            }}>
            Адрес кофейни: 
                    <span style={{
                        color: 'rgba(0, 0, 0, 0.7)', 
                            marginLeft: '1rem',
                            fontWeight:'300'}}>
                        {coffeePot}
                    </span>
        </p>
    )
}

export default Message