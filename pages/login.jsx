import React, { useState } from 'react'
import Layout from '../components/Layout'
import LoginForm from '../components/ui/LoginForm'

const auth = () => {

    return (
        <Layout title="Вход">
            <LoginForm/>
        </Layout>
    )
}


export default auth