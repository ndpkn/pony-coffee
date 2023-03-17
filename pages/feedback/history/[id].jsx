import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import PonyService from '../../../services/PonyServices'
import FeedbackIdPageView from '../../../components/screens/FeedbackIdPageView'

const FeedbackIdPage = () => {
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
        ponyService.getFeedbackById(pid)
            .then(onFeedbackLoaded)
            .catch(onError)
    },[pid])
    
    const onFeedbackLoaded = (feedbackList) => {
        setFeedback(feedbackList)
        setMessages(feedbackList.messages)
        setLoading(false)

        console.log(feedbackList, 'feedbackList');
    }
    const onError = (err) => {
        setError(true)
        setLoading(false)
        console.log(err);
    }

    useEffect(() => {
        // Pusher.logToConsole = true;

        const pusher = new Pusher('7f9d43f02a4ad59feb75', {
            cluster:'eu',
            authEndpoint: `http://localhost:8080/api/broadcasting/auth`,
            auth: {
                headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
            }
        })
        const privateChannel = pusher.subscribe(`private-user.3`);
        privateChannel.bind(`message`, function(data) {
            console.log(data, 'data');
            allMessages.push(data.message)
            setMessages(allMessages)
            // console.log(messages, 'messages');
        })
        return (() => {
            privateChannel.unbind()
			pusher.unsubscribe('private-user.3')
            pusher.disconnect()
		})
    }, [messages])

    const onSubmit = async (e, text) => {
        e.preventDefault()
        console.log(text);

        ponyService.addMessageUser({
            text: text
        }, pid)
            .then(onPushMessage)
            .catch(onPushError)

        setMessage('');
    }
    const onPushMessage = (res) => {
        // console.log(res);
        allMessages.push(res.data.data.message)
        setMessages(allMessages)
    }
    const onPushError = (err) => {
        console.log(err);
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }


    return (
        <Layout title='История обращений' descr='История ваших обращений'>
            <FeedbackIdPageView messages={messages} feedback={feedback} error={error} loading={loading} handleChange={handleChange} message={message} onSubmit={onSubmit}/>
        </Layout>
    )
}

export default FeedbackIdPage