import Image from 'next/image'
import Message from '../../components/ui/Message'
import styles from '../../styles/FeedbackHistory.module.scss'
import send from '../../images/send.png'
import { useEffect, useState } from 'react'
import PageHeader from '../ui/PageHeader'
import PonyService from '../../services/PonyServices'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'

const FeedbackHistoryView = () => {
    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const ponyService = new PonyService()

    // получение данных
    useEffect(() => {
        ponyService.getFeedbackHistory()
                        .then(onFeedbackLoaded)
                        .catch(onError)
        },[])

    //данные загружены успешно
    const onFeedbackLoaded = (feedbackList) => {
        setFeedbacks(feedbackList)
        setLoading(false)
        console.log(feedbackList);
    }

    //при загрузке произошла ошибка
    const onError = (err) => {
        console.log(err);
        setError(true)
        setLoading(false)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(feedbacks);
        
    }

    const items = feedbacks.map(item => {
        let grade = Number(item.grade)
        return (
            <Message 
                position='left' 
                text={item.messages[0].text} 
                grade= {grade}
                coffeePot={item.coffee_pot}
                time={(item.messages[0].created_at).slice(11,16)}
                key={item.id}/>
        )
    })

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? items : null

    return (
        <div className={styles.history}>
            <div
                style={{
                    padding:'0 3rem 0 3rem'
            }}>
                <PageHeader text='история ваших обращений'/>
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
                    
                    {errorMessage}
                    {spinner}
                    {content}

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