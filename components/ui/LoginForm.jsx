import React, { useState } from 'react'
import { loginUser } from '../libs/auth'
import Input from './Input'
import styles from '../../styles/LoginForm.module.scss'
import MainButtonType from './MainButtonType'

const LoginForm = () => {
    const [user, setUser] = useState({
        phone: '',
        password:''
    })

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

    return (
        <div className={styles.formPage}>
            <h1 style={{ marginBottom: '2rem'}}>Вход</h1>
            <form onSubmit={handleSubmit} method='POST'>
                <div>
                    <Input 
                        name='phone' 
                        type="tel" 
                        placeholder='Номер телефона' 
                        onChange={handleChange}
                        />
                    <Input 
                        name='password' 
                        type="password" 
                        placeholder='Пароль' 
                        onChange={handleChange}
                    />
                    <MainButtonType buttonName='Войти' action='confirm' type='submit'/>
                </div>
            </form>
        </div>
    )
}

export default LoginForm