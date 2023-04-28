import  { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import BaristaStatView from '../../components/screens/BaristaStatView'
import PonyService from '../../services/PonyServices'

const BaristaStat = () => {
    const [baristaStat, setBaristaStat] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const ponyService = new PonyService()

    // получение списка пользователей
    useEffect(() => {
        ponyService.getBaristaStat()
                        .then(onBaristaStatLoaded)
                        .catch(onError)
    }, [])
    const onBaristaStatLoaded = (baristaStat) => {
        setBaristaStat(baristaStat)
        setLoading(false)
        
        console.log(baristaStat);
    }
    const onError = (err) => {
        console.log(err);
        setError(true)
        setLoading(false)
    }
    return (
        <Layout title='Статистика сотрудников'>
            <BaristaStatView 
                barista={baristaStat} 
                error={error}
                loading={loading}
            />
        </Layout>
    )
}

export default BaristaStat