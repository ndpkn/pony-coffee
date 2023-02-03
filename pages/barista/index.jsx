import React, { use, useEffect, useState } from 'react'
import axios from "axios"
import Layout from '../../components/Layout'
import styles from '../../styles/CoffeePot.module.scss'
import EditButton from '../../components/ui/EditButton'
import MainButtonLink from '../../components/ui/MainButtonLink'
import PonyService from '../../services/PonyServices'
import ErrorMessage from '../../components/ui/ErrorMessage'
import LoadingMessage from '../../components/ui/LoadingMessage'

const Barista = () => {
    
    const [barista, setBarista] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    
    const ponyService = new PonyService()
    
    // получения списка сотрудников
    useEffect(() => {
        ponyService.getBarista()
                        .then(onBaristaLoaded)
                        .catch(onError)
        },[])
    
    //данные загружены успешно
    const onBaristaLoaded = (baristaList) => {
        setBarista(baristaList)
        setLoading(false)
    }

    //при загрузке произошла ошибка
    const onError = () => {
        setError(true)
        setLoading(false)
    }

    const items =  barista.map((item, i) => {
            const address = item.user_coffee_pot.coffee_pot
            return (
                <div key={i}>
                    <EditButton
                        currentValue={`${address == null ? 'Нет места работы' : address.address}`}
                        actionName={`${item.name == null ? "Нет имени" : item.name} ${item.last_name == null ? "" : item.last_name} `}
                        link={`barista/${item.id}`}/>
                </div>
                )
        })
    

    const errorMessage = error ? <ErrorMessage/>: null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? items : null

    return (
        <Layout>
            <div 
                className={styles.coffeePot}
            >
                <h1 style={{
                    marginBottom:'3rem'
                }}>Сотрудники</h1>

                {errorMessage}
                {spinner}
                {content}

                <MainButtonLink buttonName='Добавить сотрудника' action='access' href='barista/add'/>
            </div>
        </Layout>
    )
}

export default Barista