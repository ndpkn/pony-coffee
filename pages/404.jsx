import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'
import MainButtonLink from '../components/ui/MainButtonLink'

// const goBack = window.history.back();

const Page404 = () => {
    const router = useRouter()

    return (
        <Layout title="Ошибка">
            <div style={{
                padding:'3rem',
                marginBottom:'2rem'
            }}>
                <h1 style={{
                marginBottom:'2rem',
                textAlign:'center',
                fontSize:' 3rem',
                color:'#FFA700'
                }}>
                    404
                </h1>
                <h2 style={{
                marginBottom:'2rem',
                textAlign:'center',
                fontSize:' 3rem'
                }}>
                    Такой страницы не существует
                </h2>
                <MainButtonLink buttonName='Вернуться назад' action='confirm' href={''} onClick={() => router.back()}/>
            </div>
        </Layout>
    )
}

export default Page404