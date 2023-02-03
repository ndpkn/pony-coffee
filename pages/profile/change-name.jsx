import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import MainButtonLink from '../../components/ui/MainButtonLink'
import MainButtonType from '../../components/ui/MainButtonType'
import styles from '../../styles/ChangeProfile.module.scss'

const ChangeName = () => {
    const [userName, setUserName] = useState('')
    
    const handleChange = (e) => {
        setUserName(e.target.value)
    }
    const handleSubmit = (e) => {
        axios({
            method: 'put',
            url: 'http://localhost:8000/api/profile/name',
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
            <div className={styles.changeProfile}>
                <h1 className={styles.changeProfile_header}>Укажите другое имя</h1>
                <form 
                    className={styles.changeProfile_form} 
                    action="" 
                    method="POST" 
                    onSubmit={handleSubmit}>
                    <input 
                        onChange={handleChange} 
                        className={styles.changeProfile_input} 
                        name='changeName' 
                        type="tel" 
                        placeholder='Другое имя' />
                    <label 
                        className={styles.changeProfile_label} 
                        style={{marginBottom: '2.5rem'}} 
                        htmlFor="changeName"
                        >Например: Иван</label>
                    <MainButtonType 
                        buttonName='Изменить имя' 
                        action='confirm' 
                        type='submit'/>
                </form>
                <MainButtonLink 
                    buttonName='Вернуться в профиль' 
                    action='warning' 
                    href='/profile'/>
            </div>
        </Layout>
    )
}

export default ChangeName