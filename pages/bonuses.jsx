import React from 'react'
import BonusesView from '../components/screens/BonusesView'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import PonyService from '../services/PonyServices'


const Bonuses = () => {
    const [allUsers, setAllusers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const ponyService = new PonyService()

    // получение данных
    useEffect(() => {
        ponyService.getBonuses()
                        .then(onBonusesLoaded)
                        .catch(onError)
        },[])

    //данные загружены успешно
    const onBonusesLoaded = (bonusesList) => {
        setAllusers(bonusesList)
        setLoading(false)
    }

    //при загрузке произошла ошибка
    const onError = (err) => {
        setError(true)
        setLoading(false)
        console.log(err);
    }
    return (
        <Layout title='Добавление бонусов' descr='Добавление бонусов'>
            <BonusesView error={error} loading={loading} allUsers={allUsers}/>
        </Layout>
    )
}

export default Bonuses