import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/Profile.module.scss'
import profileIcon from '../../images/profileIcon.svg'
import EditButton from '../ui/EditButton'
import MainButtonLink from '../ui/MainButtonLink'
import axios from 'axios'
import PageHeader from '../ui/PageHeader'


const ProfileView = () => {
    const [profileData, setProfileData] = useState({})
    const [bonuses, setBonuses] = useState({})

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/profile', {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                // console.log(res.data.data.user);
                setProfileData(res.data.data.user)
            })
    }, [])
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/user/bonuses', {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                console.log(res.data.data);
                setBonuses(res.data.data)
                
            })
    }, [])

    return (
        <div className={styles.profile}>
            <div className={styles.profile_header}>
                <PageHeader text='Личный кабинет'/>
                <Image src={profileIcon} alt='profile icon'/>
                <p className={styles.profile_header_id}>{`Ваш ID: ${profileData.id}`}</p>
                <p className={styles.profile_header_bonus}>{`Количество бонусов: ${bonuses.count}`}</p>
                <p className={styles.profile_header_bonusDate}>{bonuses.dateBurn == null ? 'Пора выпить кофе, у вас нет бонусов' : `Можно списать до ${bonuses.dateBurn}`}</p>
            </div>
            <div className={styles.profile_main}>
                <div>
                    <EditButton 
                        actionName='Изменить имя'
                        currentValue={profileData.name} 
                        link='/profile/change-name'/>
                    <EditButton 
                        actionName='Изменить номер'
                        currentValue={profileData.phone} 
                        link='/profile/change-tel'/>
                    <EditButton 
                        actionName={profileData.email == null ? `Добавить email` : `Изменить email`}
                        currentValue={profileData.email == null ? `example@email.ru` : `${profileData.email}`} 
                        link='/profile/change-mail'/>
                    <EditButton 
                        actionName='Изменить пароль'
                        currentValue=' ' 
                        link='/profile/change-password'/>
                </div>
                <MainButtonLink buttonName='Выйти из аккаунта' action='danger' href='/logout'/>
            </div>
        </div>
    )
}

export default ProfileView