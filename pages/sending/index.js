import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Layout from '../../components/Layout'
import SendingView from '../../components/screens/SendingView'
import PonyService from '../../services/PonyServices';

const Seending = () => {
    const { reset } = useForm();
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [errors, setErrors] = useState([])


    const ponyService = new PonyService()
    
    const onSubmit = (data) => {
        ponyService.addNotification(data)
                        .then(onNotificationPosted)
                        .catch(onError)
    }

    //успешно отправлено
    const onNotificationPosted = () => {
        setLoaded(true)
        reset({
            text: '',
            email: false,
            telegram: false,
            site: false
        })
    }

    //при загрузке произошла ошибка
    const onError = (err) => {
        const errorMessage = err.response.data.errors.messages
        setErrors(errorMessage)
        setError(true)
        setLoaded(false)
        console.log(err);
    }

    return (
        <Layout title='Рассылка'>
            <SendingView onSubmit={onSubmit} error={error} loaded={loaded} errors={errors}/>
        </Layout>
    )
}

export default Seending