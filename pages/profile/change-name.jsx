import axios from 'axios'
import { useState } from 'react'
import Layout from '../../components/Layout'
import ProfileChangeNameView from '../../components/screens/ProfileChangeNameView'

const ChangeName = () => {
    const [userName, setUserName] = useState('')
    
    const handleChange = (e) => {
        setUserName(e.target.value)
    }
    const handleSubmit = (e) => {
        axios({
            method: 'put',
            url: 'http://localhost:8080/api/profile/name',
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: {
                    name: userName,
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
        <Layout title='Изменение имени'>
            <ProfileChangeNameView handleChange={handleChange} handleSubmit={handleSubmit} />
        </Layout>
    )
}

export default ChangeName