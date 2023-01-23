import React, { useEffect, useState } from 'react'
import Input from '../../components/ui/Input'
import Layout from '../../components/Layout'
import PageHeader from '../../components/ui/PageHeader'
import { Controller, useForm } from 'react-hook-form'
import MainButtonType from '../../components/ui/MainButtonType'
import axios from 'axios'


const Add = () => {
    const [newCoffeePot, setNewCoffeePot] = useState({
        name:'',
        address:''
    })

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/admin/coffeePot', {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .catch(err => {
                console.log(err)
                err.response.status == '403' ? window.location.href='/404' : '';
            })
        },[])
    const addNewCoffeePot = async (name, address) => {
        await axios
        .post('http://localhost:8000/api/admin/coffeePot', {name, address}, {
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
            <div
            style={{
                padding:'3rem'
            }}>
                <PageHeader text='Добавление кофейни'/>
                <form method="POST" onSubmit={onSubmit}>
                    <Input 
                        name='name'
                        type='text' 
                        placeholder='Название кофейни' 
                        onChange={handleChange}
                        />
                    <Input 
                        name='address'
                        type='text' 
                        placeholder='Адрес кофейни' 
                        onChange={handleChange}
                        />
                    <MainButtonType buttonName='добавить' action='confirm' type='submit'/>
                </form>
            </div>
        </Layout>
    )
}

export default Add