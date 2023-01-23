import React, { use, useEffect, useState } from 'react'
import axios from "axios"
import Layout from '../../components/Layout'
import styles from '../../styles/CoffeePot.module.scss'
import EditButton from '../../components/ui/EditButton'
import MainButtonLink from '../../components/ui/MainButtonLink'


const Barista = () => {
    // получения списка кофеен
    const [barista, setBarista] = useState([])
    
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/barista', {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(({data}) => {
                setBarista(data.data.users)
            })
            .catch(err => {
                console.log(err)
                err.response.status == '403' ? window.location.href='/404' : '';
            })
        },[])
        
    return (
        <Layout>
            <div 
                className={styles.coffeePot}
            >
                <h1 style={{
                    marginBottom:'3rem'
                }}>Сотрудники</h1>
                {barista.map((item, i) => {
                    const address = item.user_coffee_pot
                    return (
                        <div key={i}>
                            <EditButton
                                currentValue={`${address == null ? 'Нет места работы' : address.coffee_pot.address}`}
                                actionName={`${item.name == null ? "Нет названия" : item.name} ${item.last_name}`}
                                link={`barista/${item.id}`}/>
                        </div>
                        )
                })}
                <MainButtonLink buttonName='Добавить сотрудника' action='confirm' href='barista/add'/>
            </div>

        </Layout>
    )
}

export default Barista