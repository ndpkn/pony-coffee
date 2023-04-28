import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import ProfileChangeTelView from '../../components/screens/ProfileChangeTelView'
import PonyService from '../../services/PonyServices'
import { loadReCaptcha, reCaptchaExecute } from 'recaptcha-v3-react-function-async'


const ChangeTel = () => {
    const [userTel, setUserTel] = useState('')
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState([])
    const key = '6LdkKlgkAAAAAOYiR_jTMnuu2Rcdn_hO1ut3r3pJ'
    
    const ponyService = new PonyService()
    const [code, setCode] = useState('')
    
    useEffect(() => {
        loadReCaptcha(key)
            .then()
            .catch()
    }, [])

    const handleChangePhone = (e) => {
        setUserTel(e.target.value)
    }
    const handleChangeCode = (e) => {
        setCode(e.target.value)
    }

    const getCode = async (e, phone) => {
        e.preventDefault()
        let recaptcha = await reCaptchaExecute(key, 'setting')
        ponyService.getCode({phone, recaptcha})
            .then(onCodeReceived)
            .catch(onCodeError)
    }
    const onCodeReceived = (res) => {
        console.log(res);
        setSuccess(['Код отправлен'])
        setErrors([])
    }
    const onCodeError = (err) => {
        setErrors(err.response.data.errors.messages)
        setSuccess([])
        console.log(err, 'onCodeError');
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        let recaptcha = await reCaptchaExecute(key, 'setting')
        ponyService.changePhone({
                phone: userTel,
                code: code,
                recaptcha: recaptcha
            })
            .then(onChangePhone)
            .catch(onChangeError)
    }
    const onChangePhone = (res) => {
        console.log(res);
        window.location.href = '/profile'
    }
    const onChangeError = (err) => {
        console.log(err);
        setErrors(err.response.data.errors.messages)
    }

    return (
        <Layout title='Изменение телефона'>
            <ProfileChangeTelView 
                handleChangePhone={handleChangePhone} 
                handleChangeCode={handleChangeCode} 
                handleSubmit={handleSubmit}
                errors={errors}
                getCode={getCode}
                userTel={userTel}
                success={success}
                />
        </Layout>
    )
}

export default ChangeTel