import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/FeedbackHistory.module.scss'
import send from '../../images/send.png'
import PageHeader from '../../components/ui/PageHeader'
import Image from 'next/image'
import Message from '../ui/Message'
import Pusher from 'pusher-js'
import PonyService from '../../services/PonyServices'

const FeedbackIdPageView = () => {
    const router = useRouter()
    const pid = router.query.id
    const ponyService = new PonyService()

    // const [username, setUsername] = useState('username');
    const [messages, setMessages] = useState([]);
    const [text, setMessage] = useState('');
    const [channels, setChannels]= useState([])
    let allMessages = [];

    useEffect(() => {
        ponyService.getChannels()
            .then(onLoadChannels)
            .catch(onError)
    },[])
    
    const onLoadChannels = (channelsList) => {
        setChannels(channelsList)
    }
    const onError = (err) => {
        console.log(err);
    }

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('7f9d43f02a4ad59feb75', {
            cluster:'eu',
            channelAuthorization: {
                endpoint: "http://localhost:8080/broadcasting/auth",
                transport: "ajax",
                params: {},
                headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                paramsProvider: null,
                headersProvider: null,
                customHandler: null,
                },
            });
        const privateChannel = pusher.subscribe(`${channels.path}`);
        privateChannel.bind(`${channels.event}`, (data) => {
            console.log(data);
            allMessages.push(data)
            setMessages(allMessages)
            console.log(messages);
        });
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(text);

        // axios({
        //     url: `http://localhost:8080/api/feedback/${pid}`,
        //     method: 'POST',
        //     headers: {
        //         accept: 'application/json',
        //         authorization: `Bearer ${localStorage.getItem('token')}`
        //     },
        //     data: {
        //             text: text,
        //         }
        //     })
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        await fetch(`http://localhost:8080/api/feedback/${pid}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                text
            })
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
            
                        
        setMessage('');
    }


    // const onMessageSend = (res) => {
    //     console.log(res);
    // }
    // const onError = (err) => {
    //     console.log(err);
    // }

    return (
        <div className={styles.history}>
            <div
                style={{
                    padding:'0 3rem 0 3rem'
            }}>
                <PageHeader text='история ваших обращений'/>
                <p style={{
                        fontSize:'1.3rem',
                        color:'rgba(0, 0, 0, 0.35)',
                        textAlign:'center',
                        marginTop:'3rem'
                        }}>
                    12.02.22
                </p>
                <div style={{
                        display:'flex', 
                        flexDirection:'column',
                        marginTop:'1rem'
                        }}>
                    {messages.map((text,i) => {
                        return (
                            <Message 
                                key={i}
                                position='right' 
                                text={text.text}
                                time='12:45'/>
                        )
                    })}
                    
                </div>
            </div>
            <div className={styles.input_block}>
                <form onSubmit={e => onSubmit(e, text)} className={styles.input_form} action="post">
                    <input 
                        type="text"
                        className={styles.input_text}
                        placeholder='Сообщение'
                        value={text}
                        onChange={e => setMessage(e.target.value)}/>
                    <button 
                        className={styles.input_send} 
                        type="submit"
                        >
                        <Image src={send} alt='send' />
                    </button>
                </form>
            </div>
        </div>

    )
}

export default FeedbackIdPageView