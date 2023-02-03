import React, { useEffect, useState } from 'react'
import Input from '../../components/ui/Input'
import Layout from '../../components/Layout'
import PageHeader from '../../components/ui/PageHeader'
import styles from '../../styles/Feedback.module.scss'
import MainButtonType from '../../components/ui/MainButtonType'
import PhoneInput from '../../components/ui/PhoneInput'
import axios from 'axios'
import PonyService from '../../services/PonyServices'
import MainButtonLink from '../../components/ui/MainButtonLink'


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

    const coffeePotsItems = 
        coffeePots.map((item, i) => {
            return <option key={i} value={item.id}>{item.address}</option>
        })

    const errorMessage = error ? <option>Ошибка загрузки данных</option> : null
    const spinner = loading ? <option>Загрузка ...</option> : null
    const content = !(loading || error) ? coffeePotsItems : null

    const addNewBarista = async (name, last_name, phone, password, password_confirmation, coffee_pot_id) => {
        await axios
        .post('http://localhost:8000/api/barista', {name, last_name, phone, password, password_confirmation, coffee_pot_id}, {
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
            <div
            style={{
                padding:'3rem'
            }}>
                <PageHeader text='Добавление сотрудника'/>
                <form method="POST" onSubmit={onSubmit}>
                    <Input 
                        name='name'
                        type='text' 
                        placeholder='Имя' 
                        onChange={handleChange}
                        />
                    <Input 
                        name='last_name'
                        type='text' 
                        placeholder='Фамилия' 
                        onChange={handleChange}
                        />
                    <PhoneInput 
                        name='phone'
                        type='tel' 
                        placeholder='Телефон' 
                        onChange={handleChange}
                        pattern="\+?[0-9\s\-\(\)]+"
                        />
                    <select 
                        className={styles.select} 
                        name='coffee_pot_id' 
                        onChange={handleChange}
                        >
                            
                        {errorMessage}
                        {spinner}
                        {content}

                    </select>
                    <Input 
                        name='password'
                        type={isShow == false ? 'password' : 'text'} 
                        placeholder='Пароль'
                        minLength='8'
                        onChange={handleChange}
                        isShowPass={isShowPass}
                        isShow={isShow}
                        />
                    <Input 
                        name='password_confirmation'
                        type={isShow == false ? 'password' : 'text'} 
                        placeholder='Подтвердите пароль'
                        minLength='8'
                        onChange={handleChange}
                        isShowPass={isShowPass}
                        isShow={isShow}
                        />
                    {errors == null ? ''
                    : errors.map((item, i) => {
                        return <p style={{marginTop:'2rem', marginBottom:'2rem', color:'red'}} key={i}>{item}</p>
                    })}
                    <MainButtonType buttonName='добавить' action='access' type='submit'/>
                    <MainButtonLink buttonName='Вернуться назад' action='confirm' href='/barista'/>

                </form>
                
            </div>
        </Layout>
    )
}

export default Add