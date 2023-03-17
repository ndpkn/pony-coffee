import styles from '../../styles/Message.module.scss'
import AddressBlock from './AddressBlock'
import RatingBlock from './RatingBlock'

const Message = ({position, text, grade, coffeePot, time}) => {
    return (
        <div className={position === 'left' ? `${styles.left}` : `${styles.right}`}>
            <div>
                <p 
                    style={{
                            fontSize:'1.4rem', 
                            color: 'rgba(0, 0, 0, 0.5)',
                            marginRight: '1rem',
                            // marginBottom: '1rem',
                            wordBreak: 'break-all'
                        }}>
                    {text}
                </p>
                {grade ? <RatingBlock grade={grade}/> : null}
                {coffeePot ? <AddressBlock address={coffeePot.address}/>: null}
            </div>
            <p className={position === 'left' ? `${styles.left_time}`: `${styles.right_time}`}>
                {time}
            </p>
        </div>
    )
}



export default Message