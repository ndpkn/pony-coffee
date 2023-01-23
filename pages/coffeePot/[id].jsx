import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import InputEditButton from '../../components/ui/InputEditButton'
import MainButtonType from '../../components/ui/MainButtonType'
import MainButtonLink from '../../components/ui/MainButtonLink'
import PageHeader from '../../components/ui/PageHeader'


const CoffeePotPage = () => {
    const router = useRouter()
    const id = router.query.id
    const [coffeePot, setCoffeePot] = useState([])
    
    const [changeCoffeePotName, setChangeCoffeePotName] = useState('')
    const [changeCoffeePotAddress, setChangeCoffeePotAddress] = useState('')

    const [error, setError] = useState([])

    //получение данных кофейни
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/admin/coffeePot/${id}`, {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((data) => {
                setCoffeePot(data.data.data.coffeePot)
                setChangeCoffeePotName(data.data.data.coffeePot.name)
                setChangeCoffeePotAddress(data.data.data.coffeePot.address)
            })
            
            .catch(err => {
                console.log(err)
                err.response.status == '403' ? window.location.href='/404' : '';
            })
        },[id])

    //изменение данных кофейни
    const changeCoffeePot = async (name, address) => {
        await axios({
            method: 'put',
            url: `http://localhost:8000/api/admin/coffeePot/${id}`,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: {
                    name: name,
                    address: address
                }
            })
            .then(res => {
                console.log(res);
                window.location.href = `/coffeePot`

            })
            .catch((err) => {
                console.log(err);
            })
    }
    //получение данных из полей ввода
    const handleChangeName = e => {
        setChangeCoffeePotName(e.target.value)
    }
    const handleChangeAddress = e => {
        setChangeCoffeePotAddress(e.target.value)
    }
    //отправка формы
    const handleSubmit = e => {
        e.preventDefault();
        changeCoffeePot(changeCoffeePotName, changeCoffeePotAddress)
    }

    //удаление кофейни
    const deleteCoffeePot = (id) => {
        axios
        .delete(`http://localhost:8000/api/admin/coffeePot/${id}`, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            window.location.href = '/coffeePot'
        })
    }

    return (
        <Layout title='Страница кофейни' descr='страница кофейни'>
            <div 
                style={{
                    padding:'3rem'
            }}>
                <PageHeader text={coffeePot.address}/>
                <form 
                    action="" 
                    method="POST" 
                    onSubmit={handleSubmit}>
                    <InputEditButton 
                        actionName='Введите новое название'
                        currentValue={coffeePot.name == null ? 'Нет названия' : coffeePot.name}
                        onChange={handleChangeName}
                        />
                    <InputEditButton 
                        actionName='Введите новый адрес'
                        currentValue={coffeePot.address == null ? 'Нет адреса' : coffeePot.address}
                        onChange={handleChangeAddress}/>
                    <MainButtonType buttonName='сохранить' action='access' type='submit'/>
                    <MainButtonType buttonName='Удалить' action='danger' type='submit' onClick={() => deleteCoffeePot(id)}/>
                    <MainButtonLink buttonName='вернуться назад' action='confirm' href='/coffeePot'/>
                    <p style={{color:'#0000002B', marginTop:'1rem'}}>Дата создания: {coffeePot.created_at == null ? 'Нет названия' : coffeePot.created_at.slice(0,10)}</p>
                    <p style={{color:'#0000002B', marginTop:'1rem'}}>Дата последнего редактирования: {coffeePot.updated_at == null ? 'Нет названия' : coffeePot.updated_at.slice(0,10)}</p>
                </form>
            </div>
        </Layout>
    )
}

export default CoffeePotPage