import React from 'react'
import Layout from '../components/layout/Layout'

const register = () => {
    return (
        <Layout title="Регистрация">
            <h1>Регистрация</h1>
            <input type="text" placeholder='Имя'/>
            <input type="text" placeholder='Фамилия'/>
            <input type="email" placeholder='Почта' />
            <input type="tel" placeholder='Номер телефона' />
            <input type="password" placeholder='пароль' />
        </Layout>
    )
}

export default register