import Layout from '../../components/Layout'
import { useEffect, useState } from 'react'
import ProfileChangeMailView from '../../components/screens/ProfileChangeMailView'
import PonyService from '../../services/PonyServices'
import { loadReCaptcha, reCaptchaExecute } from 'recaptcha-v3-react-function-async'

const ChangeMail = () => {
    const [userMail, setUserMail] = useState('')
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState([])
    const key = '6LdkKlgkAAAAAOYiR_jTMnuu2Rcdn_hO1ut3r3pJ'
    const [code, setCode] = useState('')

    const ponyService = new PonyService()

    useEffect(() => {
        loadReCaptcha(key)
            .then()
            .catch()
    }, [])

    const handleChangeMail = (e) => {
        setUserMail(e.target.value)
    }
    const handleChangeCode = (e) => {
        setCode(e.target.value)
    }

    const getCode = async (e) => {
        e.preventDefault()
        let recaptcha = await reCaptchaExecute(key, 'setting')
        ponyService.getEmailCode({email: userMail, recaptcha})
            .then(onCodeReceived)
            .catch(onCodeError)
    }
    const onCodeReceived = (res) => {
        console.log(res);
        setErrors([])
        setSuccess(['Код отправлен'])
    }
    const onCodeError = (err) => {
        setErrors(err.response.data.errors.messages)
        console.log(err, 'onCodeError');
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        ponyService.changeEmail({
                email: userMail,
                code: code
            })
            .then(onChangeEmail)
            .catch(onChangeError)
    }
    const onChangeEmail = (res) => {
        console.log(res);
        window.location.href = '/profile'
    }
    const onChangeError = (err) => {
        console.log(err);
        setErrors(err.response.data.s)
    }
    return (
        <Layout title='Изменение email'>
            <ProfileChangeMailView 
                handleChangeMail={handleChangeMail} 
                handleChangeCode={handleChangeCode}
                handleSubmit={handleSubmit}
                userMail={userMail}
                errors={errors}
                getCode={getCode}
                success={success}
                />
        </Layout>
    )
}

export default ChangeMail