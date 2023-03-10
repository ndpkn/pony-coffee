import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import PonyService from '../../services/PonyServices'
import CoffeePotIdPageView from '../../components/screens/CoffeePotIdPageView'

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
    const deleteCoffeePot = (pid) => {
        axios
        .delete(`http://localhost:8080/api/admin/coffeePot/${pid}`, {
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
        <CoffeePotIdPageView handleSubmit={handleSubmit} coffeePot={coffeePot} handleChangeAddress={handleChangeAddress} handleChangeName={handleChangeName} error={error} loading={loading} deleteCoffeePot={deleteCoffeePot} pid={pid}/>
    </Layout>

    )
}

export default CoffeePotPage