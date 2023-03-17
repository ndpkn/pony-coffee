import {  useRef } from 'react'
import Layout from '../../Layout'
import MainPageView from '../MainPageView'

const Main = () => {
    const fieldRef = useRef(null)

    return (
        <Layout title="Главная страница">
            <MainPageView fieldRef={fieldRef}/>
        </Layout>
    )
}

export default Main