import React, { useEffect, useState } from 'react'
import Input from '../../components/ui/Input'
import Layout from '../../components/Layout'
import PageHeader from '../../components/ui/PageHeader'
import styles from '../../styles/Feedback.module.scss'
import MainButtonType from '../../components/ui/MainButtonType'
import PhoneInput from '../../components/ui/PhoneInput'
import axios from 'axios'


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

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/barista', {
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
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/coffeePot/address', {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(({data}) => {
                setCoffeePots(data.data.coffeePots, data.data.coffeePots.unshift({address:'Выберите место работы', id: 0}) )
            })
            .catch(err => {
                console.log(err)
                err.response.status == '403' ? window.location.href='/404' : null;
            })
    }, [])

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
                            {coffeePots.map((item, i) => {
                                return <option key={i} value={item.id}>{item.address}</option>
                            })}
                    </select>
                    <Input 
                        name='password'
                        type='password' 
                        placeholder='Пароль'
                        minLength='8'
                        onChange={handleChange}
                        />
                    <Input 
                        name='password_confirmation'
                        type='password' 
                        placeholder='Пароль'
                        minLength='8'
                        onChange={handleChange}
                        />
                    {errors == null ? ''
                    : errors.map((item, i) => {
                        return <p style={{marginTop:'2rem', marginBottom:'2rem', color:'red'}} key={i}>{item}</p>
                    })}
                    <MainButtonType buttonName='добавить' action='confirm' type='submit'/>
                </form>
                
            </div>
        </Layout>
    )
}

export default Add