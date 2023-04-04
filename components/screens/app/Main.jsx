import {  useEffect, useRef, useState } from 'react'
import Layout from '../../Layout'
import MainPageView from '../MainPageView'
import { useMediaQuery } from 'react-responsive'

const Main = () => {
    const fieldRef = useRef(null)

    const [isClient, setIsClient] = useState(false)
    //для избежания ошибки гидратации
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true);
        }
    }, [])

    return (
        <Layout title="Главная страница" maxWidth>
            {isClient ? <MainPageView fieldRef={fieldRef}/> : null}
        </Layout>
    )
}

export default Main