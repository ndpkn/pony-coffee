import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import ErrorMessage from '../../../components/ui/ErrorMessage'
import LoadingMessage from '../../../components/ui/LoadingMessage'
import MainButtonLink from '../../../components/ui/MainButtonLink'
import PageHeader from '../../../components/ui/PageHeader'
import PonyService from '../../../services/PonyServices'
import styles from '../../../styles/FeedbackAdminView.module.scss'


const FeedbackAdminIdPage = () => {
    const router = useRouter()
    const pid = router.query.id

    const [feedback, setFeedback] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    
    const ponyService = new PonyService()
    
    // получения списка сотрудников
    useEffect(() => {
        ponyService.getAdminFeedbackById(pid)
                        .then(onFeedbackLoaded)
                        .catch(onError)
        },[])
    
    //данные загружены успешно
    const onFeedbackLoaded = (feedbackList) => {
        setFeedback(feedbackList)
        setLoading(false)
        console.log(feedbackList);
    }

    //при загрузке произошла ошибка
    const onError = () => {
        setError(true)
        setLoading(false)
    }
    // const items =  <Message 
    //                     position='left' 
    //                     text={item.messages[0].text} 
    //                     grade= {grade}
    //                     coffeePot={item.coffee_pot}
    //                     time={(item.messages[0].created_at).slice(11,16)}
    //                     key={item.id}/>

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? items : null

    return (
        <Layout title='Страница сотрудника' descr='страница сотрудника'>
        <div className={styles.feedback}>
            <PageHeader text='имя пользователя'/>

                {errorMessage}
                {spinner}
                {content}

            <MainButtonLink buttonName='вернуться назад' action='confirm' href='/feedback/admin'/>
        </div>
    </Layout>
    )
}

export default FeedbackAdminIdPage