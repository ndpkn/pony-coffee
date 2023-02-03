import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/CoffeePot.module.scss'
import EditButton from '../../components/ui/EditButton'
import MainButtonLink from '../../components/ui/MainButtonLink'
import PonyService from '../../services/PonyServices'
import ErrorMessage from '../../components/ui/ErrorMessage'
import LoadingMessage from '../../components/ui/LoadingMessage'

const CoffeePot = () => {
    const [coffeePot, setCoffeePot] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    
    const ponyService = new PonyService()

    // получение данных
    useEffect(() => {
        ponyService.getCoffeePot()
                        .then(onCoffeePotLoaded)
                        .catch(onError)
        },[])

    //данные загружены успешно
    const onCoffeePotLoaded = (coffeePotList) => {
        setCoffeePot(coffeePotList)
        setLoading(false)
    }

    //при загрузке произошла ошибка
    const onError = () => {
        setError(true)
        setLoading(false)
    }

    const items = coffeePot.map((item, i) => {
        return (
            <div key={i}>
                <EditButton
                    actionName={item.address}
                    currentValue={item.name == null ? "Нет названия" : item.name}
                    link={`coffeePot/${item.id}`}/>
            </div>
            )
        })
    
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? items : null
        
    return (
        <Layout>
            <div 
                className={styles.coffeePot}
            >
                <h1 style={{
                    marginBottom:'3rem'
                }}>кофейни</h1>
                
                {errorMessage}
                {spinner}
                {content}

                <MainButtonLink buttonName='Добавить кофейню' action='access' href='coffeePot/add'/>
            </div>

        </Layout>
    )
}

export default CoffeePot