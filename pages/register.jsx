import React, { useState } from 'react'
import Layout from '../components/Layout'
import ErrorMessage from '../components/ui/ErrorMessage'
import RegisterForm from '../components/ui/RegisterForm'
import PonyService from '../services/PonyServices'

const Register = () => {
    //ВОЗМОЖНЫ ОШИБКИ НУЖНО ПЕРЕПРОВЕРИТЬ
    const [user, setUser] = useState({
        phone: '', 
        password: '', 
        password_confirmation: '', 
        user_name: '', 
        code:'',
        agreement: false
    })
    const [isShow, setIsShow] = useState(false)
    const [error, setError] = useState([])

    const ponyService = new PonyService()

    //кнопка и поле для ввода кода подтверждения под полем телефон 
    //данные поля телефон брать для отправки запроса кода
    //выводить ошибку если не введен телефон или введен неверно

    // /call для запроса звонка 

    const registerUser = async (phone, password, password_confirmation, name, agreement, code) => {    
        ponyService.register({phone, password, password_confirmation, name, agreement, code})
            .then(onRegister)
            .catch(onError)
    }
    const onRegister = (res) => {
        console.log(res);
        // window.location.href = '/login'
        // localStorage.setItem('token', res.data.token.accessToken)
        // засунуть в редакс
    }
    const onError = (err) => {
        console.log(err);
        //нужно получать errors ввиде массива
        const errors = err.response.data.errors.messages
        setError(errors)
        console.log(errors);
    }

    const handleChange = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value})
    }
    const handleSubmit = e => {
        const {phone, password, password_confirmation, user_name, agreement, code} = user
        e.preventDefault();
        registerUser(phone, password, password_confirmation, user_name, agreement, code)``
    }
    const getCode = (e, phone) => {
        e.preventDefault()
        ponyService.getCode({phone})
            .then(onCodeReceived)
            .catch(onCodeError)
    }
    const onCodeReceived = (res) => {
        console.log(res);
    }
    const onCodeError = (err) => {
        console.log(err);
    }
    const isShowPass = (e) => {
        e.preventDefault()
        setIsShow(!isShow)
    }
    const errors = 
        error != null
        ?
        // console.log(error)
        error.map((item, i) => {
            console.log(error)
            return (
                <ErrorMessage key={i} textError={item}/>
            )
        })
        :
        null

    return (
        <Layout title="Регистрация">
            <RegisterForm handleSubmit={handleSubmit} handleChange={handleChange} getCode={getCode} isShowPass={isShowPass} isShow={isShow} errors={errors}/>
        </Layout>
    )
}

export default Register