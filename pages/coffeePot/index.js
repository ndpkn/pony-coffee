import React, { use, useEffect, useState } from 'react'
import axios from "axios"
import Layout from '../../components/Layout'


const CoffeePot = () => {

    //поля для отпправки на апи
    const [coffeePot, setCoffeePot] = useState({
        name: '',
        address:''
    })
    
    const handleChange = event => {
        setCoffeePot({
            ...coffeePot,
            [event.target.name]: event.target.value})
        }
        const handleSubmit = event => {
            const {name, address} = coffeePot
            event.preventDefault();
            addCoffeePot(name, address)
            
        }
        
        // получения списка кофеен
    const [data, setData] = useState([])
    
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/admin/coffeePot', {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(({data}) => {
                setData(data.data.coffeePots)
                console.log(data.data);
            })
    },[data.data])
        
        //
        
    //добавление кофейни
    const addCoffeePot = async (name, address) => {
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
//
//удаление кофейни
    const deleteCoffeePot = (id) => {
        const potId = data.filter(item => item.id === id)[0].id
        console.log(potId);
        axios
        .delete(`http://localhost:8000/api/admin/coffeePot/${potId}`, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(({data}) => {
            // setData(data.data.coffeePots)
            window.location.href = '/coffeePot'
            console.log(data.data);
        })
    }
    return (
        <Layout>
            <div>CoffeePot
                <form onSubmit={handleSubmit} method='POST'>
                <div>
                    <input 
                        name='name' 
                        type="text" 
                        placeholder='Название кофейни' 
                        onChange={handleChange}
                        />
                    <input 
                        name='address' 
                        type="text" 
                        placeholder='Адрес' 
                        onChange={handleChange}
                        />
                    <button type='submit'>Добавить</button>
                </div>
            </form>
            </div>

            <ul>
                {data.map((item, i) => {
                    return (
                        <div key={i}>
                        <li>{item.name}: {item.address} </li>
                        <button onClick={() => deleteCoffeePot(item.id)}>Удалить</button>
                        </div>
                        )
                })}
            </ul>
        </Layout>
    )
}

export default CoffeePot