import Layout from '../../components/Layout'
import axios from 'axios'
import { useState } from 'react'
import ProfileChangePassView from '../../components/screens/ProfileChangePassView'

const ChangePassword = () => {
    const [userPass, setUserPass] = useState('')
    const [userPassConfirm, setUserPassConfirm] = useState('')
    
    const handleChange = (e) => {
        setUserPass(e.target.value)
    }
    const handleChangeConfirm = (e) => {
        setUserPassConfirm(e.target.value)
    }
    const handleSubmit = (e) => {
        axios({
            method: 'put',
            url: 'http://localhost:8080/api/profile/password',
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: {
                    password: userPass,
                    password_confirmation: userPassConfirm
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
        <Layout title='Изменение пароля'>
            <ProfileChangePassView handleChange={handleChange} handleSubmit={handleSubmit} handleChangeConfirm={handleChangeConfirm}/>
        </Layout>
    )
}

export default ChangePassword