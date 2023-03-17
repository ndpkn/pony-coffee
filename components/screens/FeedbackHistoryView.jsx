import PageHeader from '../ui/PageHeader'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'
import EditButton from '../ui/EditButton'
import styles from '../../styles/FeedbackHistory.module.scss'

const FeedbackHistoryView = ({feedbacks, error, loading}) => {
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