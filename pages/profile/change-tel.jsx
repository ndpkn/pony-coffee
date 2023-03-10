import axios from 'axios'
import { useState } from 'react'
import Layout from '../../components/Layout'
import ProfileChangeTelView from '../../components/screens/ProfileChangeTelView'

const ChangeTel = () => {
    const [userTel, setUserTel] = useState('')
    // const [code, setCode] = useState('')
    
    const handleChange = (e) => {
        setUserTel(e.target.value)
    }
    const handleSubmit = (e) => {
        axios({
            method: 'put',
            url: 'http://localhost:8080/api/profile/phone',
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: {
                    phone: userTel,
                    // code: code
                }
            })
            .then((res) => {
                console.log(res);
                window.location.href = '/profile'
            })
            .catch((err) => {
                console.log(err);
            });
            
            e.preventDefault()
        
        }
    return (
        <Layout title='Изменение телефона'>
            <ProfileChangeTelView handleChange={handleChange} handleSubmit={handleSubmit}/>
        </Layout>
    )
}

export default ChangeTel