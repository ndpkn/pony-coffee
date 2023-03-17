import Layout from '../../components/Layout'
import { useState } from 'react'
import ProfileChangeMailView from '../../components/screens/ProfileChangeMailView'
import PonyService from '../../services/PonyServices'

const ChangeMail = () => {
    const [userMail, setUserMail] = useState('')
    const [errors, setErrors] = useState([])
    const ponyService = new PonyService()

    const handleChange = (e) => {
        setUserMail(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        ponyService.changeEmail({
                email: userMail,
                // code: code
            })
            .then(onChangeEmail)
            .catch(onChangeError)
    }
    const onChangeEmail = (res) => {
        console.log(res);
        window.location.href = '/profile'
    }
    const onChangeError = (err) => {
        console.log(err);
        setErrors(err.response.data.s)
    }
    return (
        <Layout title='Изменение email'>
            <ProfileChangeMailView 
                handleChange={handleChange} 
                handleSubmit={handleSubmit}
                errors={errors}
                />
        </Layout>
    )
}

export default ChangeMail