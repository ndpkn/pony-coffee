import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'

const CoffeePotPage = () => {
    const router = useRouter()
    const id = router.query.id
    const [coffeePot, setCoffeePot] = useState([])
    
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/admin/coffeePot', {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(({data}) => {
                setCoffeePot(data.data.coffeePots.filter(item => item.id == id))
                console.log(data.data.coffeePots.filter(item => item.id == id));
            })
            .catch((err) => console.log(err))
    },[coffeePot])

    // const coffeePotArr = coffeePots.filter((item) => item.id == id)
    // const coffeePot = Object.assign(coffeePotArr)
    // console.log(coffeePot);
    
    return (
        <Layout title='страница кофейни' descr='страница кофейни'>
            <div>
                <h1>{coffeePot.address}</h1>
            </div>
        </Layout>
    )
}

export default CoffeePotPage