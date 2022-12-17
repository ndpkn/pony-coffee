import React, { useState } from 'react'
import { registerUser } from '../libs/register'

const RegisterForm = () => {
    const [user, setUser] = useState({
        phone: '', 
        password: '', 
        password_confirmation: '', 
        user_name: '', 
        agreement: false
    })

    const handleChange = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value})
    }
    const handleSubmit = event => {
        const {phone, password, password_confirmation, user_name, agreement} = user
        event.preventDefault();
        registerUser(phone, password, password_confirmation, user_name, agreement)

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
                    name='user_name' 
                    type="text" 
                    placeholder='Имя' 
                    onChange={handleChange}
                    />
                <input 
                    name='password' 
                    type="password" 
                    placeholder='пароль' 
                    onChange={handleChange}
                    />
                <input 
                    name='password_confirmation' 
                    type="password" 
                    placeholder='пароль' 
                    onChange={handleChange}
                    />
                <input 
                    name='agreement' 
                    type="checkbox" 
                    onChange={handleChange}
                    />
                <label htmlFor="agreement">Согласие</label>
                <button type='submit'>зарегистрироваться</button>
            </div>
        </form>
    )
}

export default RegisterForm