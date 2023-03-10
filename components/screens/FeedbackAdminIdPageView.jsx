import styles from '../../styles/FeedbackHistory.module.scss'
import send from '../../images/send.png'
import Image from 'next/image'
import Message from '../ui/Message'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'

const FeedbackIdPageView = ({messages, feedback, error, loading, handleChange, message, onSubmit}) => {

    const messagesRender = messages.map((item, i) => {
        const pos = item.belongToAuthUser == 0 ? 'left' : 'right'
        return <Message 
                    position= {pos} 
                    text={item.text} 
                    // time={(item.created_at).slice(11,16)}
                    key={i}/>
    })

    const items = 
        <Message 
            position='left' 
            // text={feedback.messages[0].text} 
            grade= {feedback.grade}
            coffeePot={feedback.coffee_pot}
            // time={(feedback.messages[0].created_at).slice(11,16)}
            key={feedback.id}/>

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? items : null
    return (
        <div className={styles.history}>
            <div
                style={{
                    padding:'0 3rem 0 3rem'
            }}>
                {/* <PageHeader text='история ваших обращений'/> */}

                    {errorMessage}
                    {spinner}
                    <div style={{
                        display:'flex', 
                        flexDirection:'column',
                        marginTop:'1rem'
                        }}>
                        {content}
                        {messagesRender}    

                    </div>
            </div>
            <div className={styles.input_block}>
                <form onSubmit={e => onSubmit(e, message)} className={styles.input_form} action="post">
                    <input 
                        type="text"
                        className={styles.input_text}
                        placeholder={'Сообщение'}
                        value={message}
                        onChange={handleChange}/>
                    <button 
                        className={styles.input_send} 
                        type="submit"
                        >
                        <Image src={send} alt='send' width='2rem'/>
                    </button>
                </form>
            </div>
        </div>

    )
}

export default FeedbackIdPageView