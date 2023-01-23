import React, { use, useEffect, useState } from 'react'
import axios from "axios"
import Layout from '../../components/Layout'
import styles from '../../styles/CoffeePot.module.scss'
import EditButton from '../../components/ui/EditButton'
import MainButtonLink from '../../components/ui/MainButtonLink'


const CoffeePot = () => {
    // получения списка кофеен
    const [data, setData] = useState([])
    
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/admin/coffeePot', {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(({data}) => {
                setData(data.data.coffeePots)
                // console.log(data.data);
            })
            .catch(err => {
                console.log(err)
                err.response.status == '403' ? window.location.href='/404' : '';
            })
        },[data.data])
        
    return (
        <Layout>
            <div 
                className={styles.coffeePot}
            >
                <h1 style={{
                    marginBottom:'3rem'
                }}>кофейни</h1>
                {data.map((item, i) => {
                    return (
                        <div key={i}>
                            <EditButton
                                actionName={item.address}
                                currentValue={item.name == null ? "Нет названия" : item.name}
                                link={`coffeePot/${item.id}`}/>
                        </div>
                        )
                    })}
                    <MainButtonLink buttonName='Добавить кофейню' action='confirm' href='coffeePot/add'/>
            </div>

        </Layout>
    )
}

export default CoffeePot