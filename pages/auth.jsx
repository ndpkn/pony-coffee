import React from 'react'
import Layout from '../components/layout/Layout'

const auth = () => {
    return (
        <Layout title="Вход">
            <h1>Вход</h1>
            <input type="tel" placeholder='Номер телефона' />
            <input type="password" placeholder='пароль' />
        </Layout>
    )
}

export default auth