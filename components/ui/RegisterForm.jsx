import React, { useState } from 'react'
import styles from '../../styles/LoginForm.module.scss'
import Input from './Input'
import MainButtonType from './MainButtonType'
import { Checkbox, FormControlLabel } from '@mui/material'
import axios from 'axios'

const RegisterForm = () => {
    const [user, setUser] = useState({
        phone: '', 
        password: '', 
        password_confirmation: '', 
        user_name: '', 
        code:'',
        agreement: false
    })
    const [isShow, setIsShow] = useState(false)

    //кнопка и поле для ввода кода подтверждения под полем телефон 
    //данные поля телефон брать для отправки запроса кода
    //выводить ошибку если не введен телефон или введен неверно

    // /call для запроса звонка 

    const registerUser = async (phone, password, password_confirmation, name, agreement, code) => {    
        await axios
            .post('http://localhost:8000/api/register', {phone, password, password_confirmation, name, agreement, code} )
            .then(res => {
                console.log(res);
                // window.location.href = '/login'


                // localStorage.setItem('token', res.data.token.accessToken)// засунуть в редакс
            })
            .catch((err) => {
                console.log(err.response.data.errors);
            })
    }

    const handleChange = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value})
    }
    const handleSubmit = event => {
        const {phone, password, password_confirmation, user_name, agreement, code} = user
        event.preventDefault();
        registerUser(phone, password, password_confirmation, user_name, agreement, code)
        console.log('форма отправлена');
    }
    const getCode = (e, phone) => {
        e.preventDefault()
        axios
            .post('http://localhost:8000/api/call', {phone})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    const isShowPass = (e) => {
        e.preventDefault()
        setIsShow(!isShow)
    }

    return (
        <div className={styles.formPage}>
            <h1 style={{ marginBottom: '2rem'}}>Регистрация</h1>
            <form onSubmit={handleSubmit} method='POST'>
                <div>
                    <Input 
                        name='phone'
                        type='tel' 
                        placeholder='Телефон' 
                        onChange={handleChange}
                        pattern="\+?[0-9\s\-\(\)]+"
                        />
                    <div className={styles.code}>
                        <div className={styles.code_block}>
                            <button className={styles.code_btn} onClick={(e) => getCode(e, user.phone) }>Получить код</button>
                            <input 
                                className={styles.code_input} 
                                type="text" 
                                name="code" 
                                placeholder='Введите код'
                                maxLength={4}
                                onChange={handleChange}/>
                        </div>
                        <p className={styles.code_label}>Вам поступит звонок, введите последние 4 цифры номера</p>
                        
                    </div>
                    <Input 
                        name='user_name' 
                        type="text" 
                        placeholder='Имя' 
                        onChange={handleChange}
                        />
                    <Input 
                        name='password' 
                        type={isShow == false ? 'password' : 'text'} 
                        placeholder='Пароль' 
                        onChange={handleChange}
                        isShowPass={isShowPass}
                        isShow={isShow}
                        />
                    <Input
                        name='password_confirmation' 
                        type='password'
                        placeholder='Подтверждение пароля' 
                        onChange={handleChange}
                        isShow={isShow}
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