import React, { useEffect, useState } from 'react'
import MainButtonLink from '../ui/MainButtonLink'
import PageHeader from '../ui/PageHeader'
import styles from '../../styles/Seending.module.scss'
import PonyService from '../../services/PonyServices'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'


const SeendingHistoryView = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [textError, setTextError] = useState([])
    const [notifications, setNotifications] = useState([])

    const ponyService = new PonyService()

    useEffect(() => {
        ponyService.getNotifications()
                        .then(onNotificationsLoaded)
                        .catch(onError)
        },[])

    //данные загружены успешно
    const onNotificationsLoaded = (notifications) => {
        setNotifications(notifications)
        console.log(notifications);
        setLoading(false)
    }

    //при загрузке произошла ошибка
    const onError = (err) => {
        console.log(err)
        setError(true)
        setLoading(false)
    }

    const items = notifications.map((singleNotif, i) => {
        return <div className={styles.singleNotification} key={i}>
            <p>{singleNotif.text}</p>
        </div>
    })

    const errorMessage = error ? <ErrorMessage/>: null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? items : null

    return (
        <div className={styles.seending}>
        <PageHeader text='История рассылки'/>
            {errorMessage}
            {spinner}
            {content}
        <MainButtonLink buttonName='Вернуться назад' action='primary' href='/seending'/>
    </div>
    )
}

export default SeendingHistoryView