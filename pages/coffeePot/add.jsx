import { useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import CoffeePotAddPageView from '../../components/screens/CoffeePotAddPageView'

const Add = () => {
    const [newCoffeePot, setNewCoffeePot] = useState({
        name:'',
        address:''
    })

    const addNewCoffeePot = async (name, address) => {
        await axios
        .post('http://localhost:8080/api/admin/coffeePot', {name, address}, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res);
            window.location.href = '/coffeePot'
        })
        .catch((err) => {
            console.log(err.response);
        })
    }
    const handleChange = (e) => {
        setNewCoffeePot({
            ...newCoffeePot,
            [e.target.name]: e.target.value})
    }
    const onSubmit = (e) => {
        const {name, address} = newCoffeePot
        e.preventDefault()
        addNewCoffeePot(name, address)
    }
    return (
        <Layout title='Добавление кофейни' descr='Добавление кофейни'>
            <CoffeePotAddPageView onSubmit={onSubmit} handleChange={handleChange}/>
        </Layout>

    )
}

export default Add