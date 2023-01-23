import React, { useState } from 'react'
import { registerUser } from '../libs/register'
import styles from '../../styles/LoginForm.module.scss'
import Input from './Input'
import MainButtonType from './MainButtonType'
import { Checkbox, FormControlLabel } from '@mui/material'
import PhoneInput from './PhoneInput'



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
        <div className={styles.formPage}>
            <h1 style={{ marginBottom: '2rem'}}>Регистрация</h1>
            <form onSubmit={handleSubmit} method='POST'>
                <div>
                    <PhoneInput 
                        name='phone'
                        type='tel' 
                        placeholder='Телефон' 
                        onChange={handleChange}
                        pattern="\+?[0-9\s\-\(\)]+"
                        />
                    <Input 
                        name='user_name' 
                        type="text" 
                        placeholder='Имя' 
                        onChange={handleChange}
                        />
                    <Input 
                        name='password' 
                        type="password" 
                        placeholder='Пароль' 
                        onChange={handleChange}
                        />
                    <Input
                        name='password_confirmation' 
                        type="password" 
                        placeholder='Подтверждение пароля' 
                        onChange={handleChange}
                        />
                    <FormControlLabel
                        name='agreement'
                        onChange={handleChange}
                        control={<Checkbox />} 
                        label="Согласие на использование персональных данных" 
                        sx={{ '& .MuiSvgIcon-root': { fontSize: '3rem' },
                            '& .MuiTypography-root': {fontSize: '1.5rem', lineHeight: '1.3rem', color:'#0000006c'}  }}  
                    />
                    <MainButtonType buttonName='Зарегистрироваться' action='confirm' type='submit'/>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm