import Layout from '../../components/Layout'
import axios from 'axios'
import { useState } from 'react'
import ProfileChangeMailView from '../../components/screens/ProfileChangeMailView'

const ChangeMail = () => {
    const [userMail, setUserMail] = useState('')
    
    const handleChange = (e) => {
        setUserMail(e.target.value)
    }
    const handleSubmit = (e) => {
        axios({
            method: 'put',
            url: 'http://localhost:8080/api/profile/email',
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: {
                    email: userMail,
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
        <Layout title='Изменение email'>
            <ProfileChangeMailView handleChange={handleChange} handleSubmit={handleSubmit}/>
        </Layout>
    )
}

export default ChangeMail