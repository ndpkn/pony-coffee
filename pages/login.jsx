import React, { useState } from 'react'
import Layout from '../components/Layout'
import LoginForm from '../components/ui/LoginForm'
import PonyService from '../services/PonyServices'

const Login = () => {
    const [user, setUser] = useState({
        phone: '',
        password:''
    })
    const [error, setError] = useState([])
    const [isShow, setIsShow] = useState(false)

    const ponyService = new PonyService()

    const loginUser = async (phone, password) => {  
        ponyService.login({phone, password})
                        .then(onLogin)
                        .catch(onError)
    }

    const onLogin = (res) => {
        localStorage.setItem('token', res.data.data.accessToken)
        window.location.href = '/'
    }
    const onError = (err) => {
        const errors = err.response.data.errors.messages;

        setError(errors)
        console.log(errors);
        console.log(err);
    }

    const handleChange = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value})
    }
    const handleSubmit = event => {
        const {phone, password} = user
        event.preventDefault();
        loginUser(phone, password)
    }
    const isShowPass = (e) => {
        e.preventDefault()
        setIsShow(!isShow)
    }
    return (
        <Layout title="Вход">
            <LoginForm handleChange={handleChange} isShowPass={isShowPass} isShow={isShow} error={error} handleSubmit={handleSubmit}/>
        </Layout>
    )
}


export default Login