import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/Profile.module.scss'
import profileIcon from '../../images/profileIcon.svg'
import EditButton from '../ui/EditButton'
import MainButtonLink from '../ui/MainButtonLink'
import axios from 'axios'
import PageHeader from '../ui/PageHeader'
import PonyService from '../../services/PonyServices'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'


const ProfileView = () => {
    const [profileData, setProfileData] = useState([])
    const [bonuses, setBonuses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const ponyService = new PonyService()

    // получение данных
    useEffect(() => {
        ponyService.getProfile()
                        .then(onProfileLoaded)
                        .catch(onError)
        ponyService.getBonusesByUser()
                        .then(onBonusesLoaded)
                        .catch(onError)
        
        },[])

    //данные загружены успешно
    const onProfileLoaded = (profileList) => {
        setProfileData(profileList)
        setLoading(false)
    }
    const onBonusesLoaded = (bonusesList) => {
        setBonuses(bonusesList)
        setLoading(false)
    }

    //при загрузке произошла ошибка
    const onError = (err) => {
        setError(true)
        setLoading(false)
        console.log(err);
    }

    const items =   
        <>
        <div className={styles.profile_header}>
            <PageHeader text='Личный кабинет'/>
            <Image src={profileIcon} alt='profile icon'/>
            <p className={styles.profile_header_id}>{`Ваш ID: ${profileData.id != null ? profileData.id : 'не найден'}`}</p>
            <p className={styles.profile_header_bonus}>{bonuses.count != undefined ? `У вас ${bonuses.count} бонусов` : 'Бонусы не загружены'}</p>
            <p className={styles.profile_header_bonusDate}>{bonuses.dateBurn == null ? 'Пора выпить кофе, у вас нет бонусов' : `Можно списать до ${bonuses.dateBurn}`}</p>
        </div>
        <div className={styles.profile_main}>
            <div>
                <EditButton 
                    actionName={profileData.name == null ? `Добавить имя` : `Изменить имя`}
                    currentValue={profileData.name} 
                    link='/profile/change-name'/>
                <EditButton 
                    actionName= {profileData.phone == null ? `Добавить номер` : `Изменить номер`}
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
    </>

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <LoadingMessage/> : null
    const content = items

    useEffect(() => {
        
        
        // axios
        //     .get('http://localhost:8080/api/user/bonuses', {
        //         headers: {
        //             accept: 'application/json',
        //             authorization: `Bearer ${localStorage.getItem('token')}`
        //         }
        //     })
        //     .then((res) => {
        //         console.log(res.data.data);
        //         setBonuses(res.data.data)
                
        //     })
    }, [])

    return (
        <div className={styles.profile}>
                {errorMessage}
                {spinner}
                {content}
        </div>
    )
}

export default ProfileView