import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import PonyService from '../../services/PonyServices'
import BaristaIdPageView from '../../components/screens/BaristaIdPageView'


const BaristaPage = () => {

    const [coffeePots, setCoffeePots] = useState([])
    const [userCoffeePotId, setUserCoffeePotId] = useState()
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [barista, setBarista] = useState({
        name:'',
        last_name:'',
        phone:'',
        coffeePot: ''
    })

    const router = useRouter()
    const pid = router.query.id

    const ponyService = new PonyService()

    // получения данных
    useEffect(() => {
        if(!pid) {
            return
        }
        ponyService.getBaristaPage(pid)
                        .then(onBaristaLoaded)
                        .catch(onError)
    },[pid])
    
    //данные загружены успешно
    const onBaristaLoaded = (baristaList) => {
        setBarista(baristaList.user)
        setCoffeePots(baristaList.coffeePots, baristaList.coffeePots.unshift({address:'Выберите место работы', id: 0}) )
        setUserCoffeePotId(baristaList.user.user_coffee_pot.coffee_pot_id)
        setLoading(false)
    }
    
    //при загрузке произошла ошибка
    const onError = (err) => {
        console.log(err)
        setError(true)
        setLoading(false)
    }

    //изменение данных сотрудника
    const changeBarista = async (name, last_name, phone, coffeePot) => {
        await axios({
            method: 'put',
            url: `http://localhost:8080/api/barista/${pid}`,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: {
                    name: name,
                    last_name: last_name,
                    phone: phone,
                    coffee_pot_id: coffeePot
                }
            })
            .then(res => {
                window.location.href = `/barista`

            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors.messages)
            })

        console.log(name, last_name, phone, coffeePot);
    }
    //получение данных из полей ввода
    const handleChange = e => {
        setBarista({
            ...barista,
            [e.target.name]: e.target.value
        })
    }
    //отправка формы
    const handleSubmit = e => {
        const {name, last_name, phone, coffeePot} = barista
        e.preventDefault();
        changeBarista(name, last_name, phone, coffeePot)
        // console.log(barista.coffeePot, coffeePots);
    }

    //удаление баристы
    const deleteBarista = (pid) => {
        axios
        .delete(`http://localhost:8080/api/barista/${pid}`, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            window.location.href = '/barista'
        })
    }
    return (
        <Layout title='Страница сотрудника' descr='страница сотрудника'>
            <BaristaIdPageView coffeePots={coffeePots}  userCoffeePotId={userCoffeePotId} errors={errors} loading={loading} error={error} barista={barista} handleChange={handleChange} handleSubmit={handleSubmit} deleteBarista={deleteBarista} pid={pid}/>
        </Layout>
    )
}

export default BaristaPage