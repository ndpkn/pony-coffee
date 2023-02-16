import { useEffect, useState } from 'react'
import PageHeader from '../ui/PageHeader'
import PonyService from '../../services/PonyServices'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'
import EditButton from '../ui/EditButton'
import styles from '../../styles/FeedbackHistory.module.scss'

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
        console.log('FeedbackHistoryView', feedbackList);
    }

    //при загрузке произошла ошибка
    const onError = (err) => {
        console.log(err);
        setError(true)
        setLoading(false)
    }

    const items = feedbacks.map((item, i) => {
        return (
            <EditButton
                    key={i}
                    actionName={item.messages[0].text}
                    currentValue={ item.coffee_pot.address}
                    link={`/feedback/history/${item.id}`}/>
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
                <PageHeader text='Все ваши обращения'/>
                <div 
                    style={{
                        display:'flex', 
                        flexDirection:'column',
                        marginTop:'1rem'
                        }}>
                    
                    {errorMessage}
                    {spinner}
                    {content}

                </div>
            </div>
        </div>
    )
}

export default FeedbackHistoryView