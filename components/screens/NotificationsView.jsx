import { useState } from 'react'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'
import PageHeader from '../ui/PageHeader'
import styles from '../../styles/Notifications.module.scss'
import dateFormat from 'dateformat'
import { AnimatePresence, motion } from 'framer-motion'

const NotificationsView = ({notifications, loading, error, errors, removeNotif}) => {

    const items = 
    notifications.length !== 0 
    ?
    notifications.map((item, i) => {
        const date = new Date(item.created_at)
        const newDate = dateFormat(date, 'd.mm.yy')
        return (
            <SingleNotif key={item.id} item={item} newDate={newDate} removeNotif={removeNotif}/>
        )
    })
    :
    <p>Нет новых уведомлений</p>


    const errorMessage = error ? <ErrorMessage textError={errors}/> : null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? items : null

    return (
        <AnimatePresence>
            <div
                style={{
                padding:'3rem'
                }}
            >
                <PageHeader text='Уведомления'/>
                    {errorMessage}
                    {spinner}
                    {content}
            </div>
        </AnimatePresence>
    )
}


const SingleNotif = ({item, newDate, removeNotif}) => {

    const box = {
        initial: {
            opacity: 0,
            // scale: 0.2,
            x: -200,
            transition: { 
                duration: 0.5,
            }
        },
        animate: {
            opacity: 1,
            // scale: 1,
            x: 0,
            transition: { 
                duration: 0.5,
                }
        },
        exit: {
            display: "none"
        }
        };
    
        const [remove, setRemove] = useState(false);
    
        const handleRemove = (id) => {
            setRemove(true);
            setTimeout(() => removeNotif(id), 600);
        };
    return (
        <motion.div
            initial="initial"
            animate={remove ? "initial" : "animate"}
            exit="exit"
            variants={box}
            className={styles.notification}
            >
                <p className={styles.notification_text}>
                    {item.text}
                </p>
                <p className={styles.notification_date}>
                    {newDate}
                </p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <button 
                        className={styles.notification_close}
                        onClick={() => handleRemove(item.id)}
                        >
                        Прочитано
                    </button>
                </div>
        </motion.div>
    )
}


export default NotificationsView