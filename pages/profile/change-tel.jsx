import { useState } from 'react'
import Layout from '../../components/Layout'
import ProfileChangeTelView from '../../components/screens/ProfileChangeTelView'
import PonyService from '../../services/PonyServices'

const ChangeTel = () => {
    const [userTel, setUserTel] = useState('')
    const [errors, setErrors] = useState([])
    
    const ponyService = new PonyService()
    const [code, setCode] = useState('')
    
    const handleChange = (e) => {
        setUserTel(e.target.value)
    }

    const getCode = (e, phone) => {
        e.preventDefault()
        ponyService.getCode({phone})
            .then(onCodeReceived)
            .catch(onCodeError)
    }
    const onCodeReceived = (res) => {
        console.log(res);
    }
    const onCodeError = (err) => {
        console.log(err);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        ponyService.changePhone({
                phone: userTel,
                code: code
            })
            .then(onChangePhone)
            .catch(onChangeError)
    }
    const onChangePhone = (res) => {
        console.log(res);
        window.location.href = '/profile'
    }
    const onChangeError = (err) => {
        console.log(err);
        setErrors(err.response.data.errors.messages)
    }

    return (
        <Layout title='Изменение телефона'>
            <ProfileChangeTelView 
                handleChange={handleChange} 
                handleSubmit={handleSubmit}
                errors={errors}
                getCode={getCode}
                userTel={userTel}
                />
        </Layout>
    )
}

export default ChangeTel