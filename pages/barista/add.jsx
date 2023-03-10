import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import PonyService from '../../services/PonyServices'
import BaristaAddPageView from '../../components/screens/BaristaAddPageView'

const Add = () => {
    const [newBarista, setNewBarista] = useState({
        name:'',
        last_name:'',
        phone:'',
        password:'',
        password_confirmation:'',
        coffee_pot_id:''
    })
    const [coffeePots, setCoffeePots] = useState([])
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isShow, setIsShow] = useState(false)


    const ponyService = new PonyService()

    // получение данных
    useEffect(() => {
        ponyService.getCoffeePot()
                        .then(onCoffeePotsLoaded)
                        .catch(onError)
        },[])

    //данные загружены успешно
    const onCoffeePotsLoaded = (coffeePotList) => {
        setCoffeePots(coffeePotList, coffeePotList.unshift({address:'Выберите место работы', id: 0}))
        setLoading(false)
    }

    //при загрузке произошла ошибка
    const onError = err => {
        setError(true)
        setLoading(false)
        console.log(err)
        // err.response.status == '403' ? window.location.href='/404' : '';
    }

    const addNewBarista = async (name, last_name, phone, password, password_confirmation, coffee_pot_id) => {
        await axios
        .post('http://localhost:8080/api/barista', {name, last_name, phone, password, password_confirmation, coffee_pot_id}, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            // console.log(res);
            window.location.href = '/barista'
        })
        .catch((err) => {
            // console.log(err.response.data.errors.messages);
            setErrors(err.response.data.errors.messages)
            errors.map(item => {
                console.log(item);
            });
        })
    }
    const handleChange = (e) => {
        setNewBarista({
            ...newBarista,
            [e.target.name]: e.target.value})
    }
    const onSubmit = (e) => {
        const {name, last_name, phone, password, password_confirmation, coffee_pot_id} = newBarista
        e.preventDefault()
        console.log(newBarista);
        addNewBarista(name, last_name, phone, password, password_confirmation, coffee_pot_id)
    }

    const isShowPass = (e) => {
        e.preventDefault()
        setIsShow(!isShow)
    }
    return (
        <Layout title='Добавление сотрудника' descr='Добавление сотрудника'>
                <BaristaAddPageView coffeePots={coffeePots} errors={errors} loading={loading} error={error} isShow={isShow} handleChange={handleChange} isShowPass={isShowPass} onSubmit={onSubmit}/>
        </Layout>
    )
}

export default Add