import Image from 'next/image'
import Message from '../../components/ui/Message'
import styles from '../../styles/FeedbackHistory.module.scss'
import send from '../../images/send.png'
import { useEffect, useState } from 'react'
import axios from 'axios'

const FeedbackHistoryView = () => {
    const [feedbacks, setFeedbacks] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/feedback', {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(({data}) => {
                setFeedbacks(data.data.feedbacks)
            })
    }, [])
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(feedbacks);
        
    }
    return (
        <div className={styles.history}>
            <div
                style={{
                    padding:'0 3rem 0 3rem'
            }}>
                <h1>история ваших обращений</h1>
                <p
                    style={{
                        fontSize:'1.3rem',
                        color:'rgba(0, 0, 0, 0.35)',
                        textAlign:'center',
                        marginTop:'3rem'
                        }}>
                    12.02.22
                </p>
                <div 
                    style={{
                        display:'flex', 
                        flexDirection:'column',
                        marginTop:'1rem'
                        }}>
                    
                    {feedbacks.map(item => {
                        return (
                            <Message 
                                position='left' 
                                text={item.messages[0].text} 
                                grade={item.grade} 
                                coffeePot={item.coffee_pot_name}
                                time={(item.messages[0].created_at).slice(11,16)}
                                key={item.messages[0].feedback_id}/>
                        )
                    })}
                    {/* <Message 
                        position='right' 
                        text='Спасибо за отзыв'
                        time='12:45'/>
                    <Message 
                        position='left' 
                        text='спасибо вам' 
                        time='12:45'/>
                    <Message 
                        position='right' 
                        text='Спасибо за отзыв Спасибо за отзыв Спасибо за отзыв Спасибо за отзыв'
                        time='12:45'/> */}
                </div>
            </div>
            <div className={styles.input_block}>
                <form className={styles.input_form} action="post">
                    <input 
                        type="text"
                        className={styles.input_text}/>
                    <button 
                        className={styles.input_send} 
                        type="submit"
                        onClick={(e) => onSubmit(e)}>
                        <Image src={send} alt='send' />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FeedbackHistoryView