import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import InputEditButton from '../../components/ui/InputEditButton'
import MainButtonType from '../../components/ui/MainButtonType'
import MainButtonLink from '../../components/ui/MainButtonLink'
import PageHeader from '../../components/ui/PageHeader'
import PonyService from '../../services/PonyServices'
import ErrorMessage from '../../components/ui/ErrorMessage'
import LoadingMessage from '../../components/ui/LoadingMessage'

const CoffeePotPage = () => {
    const router = useRouter()
    const pid = router.query.id

    const [coffeePot, setCoffeePot] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [changeCoffeePotName, setChangeCoffeePotName] = useState('')
    const [changeCoffeePotAddress, setChangeCoffeePotAddress] = useState('')

    const ponyService = new PonyService()

    useEffect(() => {
        if (!pid) {
            return
        }
        ponyService.getCoffeePotPage(pid)
                        .then(onCoffeePotLoaded)
                        .catch(onError)
    },[pid])

    //данные загружены успешно
    const onCoffeePotLoaded = (coffeePotList) => {
        setCoffeePot(coffeePotList)
        setChangeCoffeePotName(coffeePotList.name)
        setChangeCoffeePotAddress(coffeePotList.address)
        setLoading(false)
    }
    
    //при загрузке произошла ошибка
    const onError = (err) => {
        console.log(err)
        setError(true)
        setLoading(false)
    }

    //изменение данных кофейни
    const changeCoffeePot = async (name, address) => {
        await axios({
            method: 'put',
            url: `http://localhost:8080/api/admin/coffeePot/${pid}`,
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
        .delete(`http://localhost:8080/api/admin/coffeePot/${id}`, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            window.location.href = '/coffeePot'
        })
    }
    const items = 
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
            <p style={{color:'#0000002B', marginTop:'1rem'}}>Дата создания: {coffeePot.created_at == null ? 'Нет названия' : coffeePot.created_at.slice(0,10)}</p>
            <p style={{color:'#0000002B', marginTop:'1rem', marginBottom:'1rem'}}>Дата последнего редактирования: {coffeePot.updated_at == null ? 'Нет названия' : coffeePot.updated_at.slice(0,10)}</p>
        </form>

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? items : null

    return (
        <Layout title='Страница кофейни' descr='страница кофейни'>
            <div 
                style={{
                    padding:'3rem'
            }}>
                <PageHeader text={coffeePot.address != null ? coffeePot.address : '' }/>
                
                {errorMessage}
                {spinner}
                {content}

                <MainButtonLink buttonName='вернуться назад' action='confirm' href='/coffeePot'/>

            </div>
        </Layout>
    )
}

export default CoffeePotPage