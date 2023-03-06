import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/FeedbackHistory.module.scss'
import send from '../../images/send.png'
import PageHeader from '../../components/ui/PageHeader'
import Image from 'next/image'
import Message from '../ui/Message'
import Pusher from 'pusher-js'
import PonyService from '../../services/PonyServices'
import axios from 'axios'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'

const FeedbackIdPageView = () => {
    const router = useRouter()
    const pid = router.query.id
    const ponyService = new PonyService()

    const [feedback, setFeedback] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    let allMessages = [...messages];


    useEffect(() => {
        if(!pid) {
            return
        }
        ponyService.getAdminFeedbackById(pid)
            .then(onFeedbackLoaded)
            .catch(onError)
    },[pid])
    
    const onFeedbackLoaded = (feedbackList) => {
        setFeedback(feedbackList)
        setMessages(feedbackList.messages)
        setLoading(false)
        console.error('data fetch');

        console.log(feedbackList, 'feedbackList');
    }
    const onError = (err) => {
        setError(true)
        setLoading(false)
        console.log(err);
    }

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('7f9d43f02a4ad59feb75', {
            cluster:'eu',
            authEndpoint: `http://localhost:8080/api/broadcasting/auth`,
            auth: {
                headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
            }
        })
        const privateChannel = pusher.subscribe(`private-admin`);
            privateChannel.bind(`message`, function(data) {
                console.log(data, 'datadadadada');
                allMessages.push(data.message)
                setMessages(allMessages)
                // console.log(messages, 'messages');
            })
            privateChannel.bind(`feedback`, function(data) {
                console.log(data, 'datadadadada');
                allMessages.push(data)
                setMessages(allMessages)
                // console.log(allMessages);
            })

        return (() => {
            privateChannel.unbind()
			pusher.unsubscribe('private-admin')
            pusher.disconnect()
		})
    },[messages])

    const onSubmit = async (e, text) => {
        e.preventDefault()
        console.log(text);

        axios({
            url: `http://localhost:8080/api/admin/feedback/${pid}`,
            method: 'POST',
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: {
                    text: text,
                }
            })
            .then((res) => {
                console.log(res);
                allMessages.push(res.data.data.message)
                setMessages(allMessages)
            })
            .catch((err) => {
                console.log(err);
            });


        setMessage('');
    }

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
                        onChange={e => setMessage(e.target.value)}/>
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