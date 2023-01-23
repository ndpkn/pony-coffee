import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/Feedback.module.scss'

import Layout from '../../components/Layout'
import InputEditButton from '../../components/ui/InputEditButton'
import MainButtonType from '../../components/ui/MainButtonType'
import PageHeader from '../../components/ui/PageHeader'
import MainButtonLink from '../../components/ui/MainButtonLink'


const BaristaPage = () => {
    const router = useRouter()
    const id = router.query.id
    const [coffeePots, setCoffeePots] = useState([])
    const [userCoffeePotId, setUserCoffeePotId] = useState()
    const [errors, setErrors] = useState([])


    const [barista, setBarista] = useState({
        name:'',
        last_name:'',
        phone:'',
        coffeePot: ''
    })
    
    //получение данных сотрудника
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/barista/${id}`, {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((data) => {
                const res = data.data.data
                setBarista(res.user)
                setCoffeePots(res.coffeePots, res.coffeePots.unshift({address:'Выберите место работы', id: 0}) )
                setUserCoffeePotId(res.user.user_coffee_pot.coffee_pot_id)
            })
            .catch(err => {
                console.log(err)
                err.response.status == '403' ? window.location.href='/404' : '';
            })
        },[id])

    //изменение данных сотрудника
    const changeBarista = async (name, last_name, phone, coffeePot) => {
        await axios({
            method: 'put',
            url: `http://localhost:8000/api/barista/${id}`,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: {
                    name: name,
                    last_name: last_name,
                    phone: phone,
                    coffeePot_id: coffeePot
                }
            })
            .then(res => {
                window.location.href = `/barista`

            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors)

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

    //удаление кофейни
    const deleteBarista = (id) => {
        axios
        .delete(`http://localhost:8000/api/barista/${id}`, {
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
            <div 
                style={{
                    padding:'3rem'
            }}>
                <PageHeader text='сотрудник'/>
                <form 
                    action="" 
                    method="POST" 
                    onSubmit={handleSubmit}>
                    <InputEditButton 
                        inputName='name'
                        actionName='Введите другое имя'
                        currentValue={barista.name == null ? 'Нет названия' : barista.name}
                        onChange={handleChange}
                        />
                    <InputEditButton 
                        inputName='last_name'
                        actionName='Введите фамилию'
                        currentValue={barista.last_name == null ? 'Фамилия не указана' : barista.last_name}
                        onChange={handleChange}/>
                    <InputEditButton 
                        inputName='phone'
                        actionName='Введите другой номер'
                        currentValue={barista.phone == null ? 'Номер не указан' : barista.phone}
                        onChange={handleChange}/>
                    <select 
                        className={styles.select} 
                        name='coffeePot' 
                        onChange={handleChange}
                        value={barista.coffeePot}
                        defaultValue={userCoffeePotId}
                        >
                            {coffeePots.map((item, i) => {
                                return <option key={i} value={item.id}>{item.address}</option>
                            })}
                    </select>
                    {errors == null ? ''
                    : errors.map((item, i) => {
                        return <p style={{marginTop:'2rem', marginBottom:'2rem', color:'red'}} key={i}>{item.message}</p>
                    })}
                    <MainButtonType buttonName='сохранить' action='access' type='submit'/>
                    <MainButtonType buttonName='Удалить' action='danger' type='submit' onClick={() => deleteBarista(id)}/>
                    <MainButtonLink buttonName='вернуться назад' action='confirm' href='/barista'/>
                    
                </form>
            </div>
        </Layout>
    )
}

export default BaristaPage