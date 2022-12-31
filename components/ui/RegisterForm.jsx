import React, { useState } from 'react'
import { registerUser } from '../libs/register'
import styles from '../../styles/LoginForm.module.scss'
import Input from './Input'
import MainButtonType from './MainButtonType'
import { Checkbox, FormControlLabel } from '@mui/material'



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
                    <Input
                        name='phone' 
                        type="tel" 
                        placeholder='Номер телефона' 
                        onChange={handleChange}
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
                        placeholder='Пароль' 
                        onChange={handleChange}
                        />
                    <FormControlLabel 
                        name='agreement'
                        onChange={handleChange}
                        control={<Checkbox />} 
                        label="Согласие на использование персональных данных" 
                        sx={{ '& .MuiSvgIcon-root': { fontSize: '3rem' },
                            '& .MuiTypography-root': {fontSize: '1.5rem', lineHeight: '1.3rem'}  }}  
                    />
                    {/* <Checkbox name='agreement' defaultChecked onChange={handleChange}/> */}
                    {/* <input 
                        name='agreement' 
                        type="checkbox" 
                        onChange={handleChange}
                        /> */}
                    {/* <label htmlFor="agreement">Согласие</label> */}
                    <MainButtonType buttonName='Зарегистрироваться' action='confirm' type='submit'/>

                </div>
            </form>

        </div>
    )
}

export default RegisterForm