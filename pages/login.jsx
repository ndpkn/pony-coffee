import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import LoginForm from '../components/ui/LoginForm'

const auth = () => {

    return (
        <Layout title="Вход">
            <h1>Вход</h1>
            <LoginForm/>
        </Layout>
    )
}


export default auth