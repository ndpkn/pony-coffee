import React from 'react'
import Layout from '../components/layout/Layout'
import RegisterForm from '../components/ui/RegisterForm'

const Register = () => {
    return (
        <Layout title="Регистрация">
            <h1>Регистрация</h1>
            <RegisterForm/>
        </Layout>
    )
}

export default Register