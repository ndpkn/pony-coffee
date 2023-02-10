import React, { useState } from 'react'
// import { loginUser } from '../libs/auth'
import Input from './Input'
import styles from '../../styles/LoginForm.module.scss'
import MainButtonType from './MainButtonType'
import axios from 'axios'

const LoginForm = () => {
    const [user, setUser] = useState({
        phone: '',
        password:''
    })
    const [error, setError] = useState([])
    const [isShow, setIsShow] = useState(false)

    const loginUser = async (phone, password) => {
        await axios
            .post('http://localhost:8080/api/login', {phone, password} )
            .then(res => {
                localStorage.setItem('token', res.data.data.accessToken)
                window.location.href = '/'
            })
            .catch((err) => {
                const errors = err.response.data.message;
                // setError(errors)
                console.log(errors);
            })
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
        <div className={styles.formPage}>
            <h1 style={{ marginBottom: '2rem'}}>Вход</h1>
            <form onSubmit={handleSubmit} method='POST'>
                <div>
                    {/* <PhoneInput 
                        name='phone'
                        type='tel' 
                        placeholder='Телефон' 
                        onChange={handleChange}
                        pattern="\+?[0-9\s\-\(\)]+"
                    /> */}
                    <Input 
                        name='phone' 
                        type="tel" 
                        placeholder='Телефон' 
                        onChange={handleChange}
                        pattern="\+?[0-9\s\-\(\)]+"
                    />
                    <Input 
                        name='password' 
                        type={isShow == false ? 'password' : 'text'} 
                        placeholder='Пароль'
                        onChange={handleChange}
                        isShowPass={isShowPass}
                        isShow={isShow}
                    />
                    <AuthError error={error}/>
                    <MainButtonType buttonName='Войти' action='confirm' type='submit'/>
                </div>
            </form>
        </div>
    )
}

const AuthError = ({error}) => {
    return (
        <div>
            {error.map((item, i) => {
                return (<p key={i}
                    style={{
                        color:'red',
                        marginBottom:'1rem'
                    }}>
                        {item}
                    </p>)
            })}
        </div>
    )
}

export default LoginForm