import React, { useState } from 'react'
import { loginUser } from '../libs/auth'

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
        <form onSubmit={handleSubmit} method='POST'>
            <div>
                <input 
                    name='phone' 
                    type="tel" 
                    placeholder='Номер телефона' 
                    onChange={handleChange}
                    />
                <input 
                    name='password' 
                    type="password" 
                    placeholder='пароль' 
                    onChange={handleChange}
                    />
                <button type='submit'>Войти</button>
            </div>
        </form>
    )
}

export default LoginForm