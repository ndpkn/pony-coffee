import React, { useEffect, useState } from 'react'
import PageHeader from '../ui/PageHeader'
import styles from '../../styles/FeedbackAdminView.module.scss'
import EditButton from '../../components/ui/EditButton'
import PonyService from '../../services/PonyServices'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'


const FeedbackAdminView = () => {
    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    
    const ponyService = new PonyService()
    
    // получения списка сотрудников
    useEffect(() => {
        ponyService.getFeedbacksAdmin()
                        .then(onFeedbacksLoaded)
                        .catch(onError)
        },[])
    
    //данные загружены успешно
    const onFeedbacksLoaded = (feedbacksList) => {
        setFeedbacks(feedbacksList)
        setLoading(false)
        console.log(feedbacksList);
    }

    //при загрузке произошла ошибка
    const onError = () => {
        setError(true)
        setLoading(false)
    }
    // const message = feedbacks.map((item, i) => {
    //     const arrLength = item.messages.length
    //     return item.messages[arrLength - 1].text
    // })

    const items = feedbacks.map((item, i) => {
        return <EditButton
                    key={i}
                    actionName={item.user.name}
                    currentValue={item.messages[0].text}
                    link={`/feedback/admin/${item.id}`}/>
    })

    const errorMessage = error ? <ErrorMessage/>: null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? items : null

    return (
        <div className={styles.feedback}>
            <PageHeader text='Все обращения'/>
            {errorMessage}
            {spinner}
            {content}
            
        </div>
    )
}

export default FeedbackAdminView



