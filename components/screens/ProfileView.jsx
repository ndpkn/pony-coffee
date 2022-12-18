import Image from 'next/image'
import React from 'react'
import styles from '../../styles/Profile.module.scss'
import profileIcon from '../../images/profileIcon.svg'
import EditButton from '../ui/EditButton'
import MainButton from '../ui/MainButton'


const ProfileView = () => {
    return (
        <div className={styles.profile}>
            <div className={styles.profile_header}>
                <h1>Личный кабинет</h1>  
                <Image src={profileIcon} alt='profile icon'/>
                <p className={styles.profile_header_id}>Ваш ID: </p>
                <p className={styles.profile_header_bonus}>Количество бонусов- </p>
                <p className={styles.profile_header_bonusDate}>Можно списать до </p>
            </div>
            <div className={styles.profile_main}>
                <div>
                    <EditButton 
                        actionName='Изменить имя'
                        currentValue='Дмитрий' 
                        link='/'/>
                    <EditButton 
                        actionName='Изменить номер'
                        currentValue='+7999888888' 
                        link='/'/>
                    <EditButton 
                        actionName='Изменить email'
                        currentValue='email@email.com' 
                        link='/'/>
                    <EditButton 
                        actionName='Изменить пароль'
                        currentValue=' ' 
                        link='/'/>
                </div>
                <MainButton buttonName='Выйти из аккаунта' action='danger'/>
            </div>
        </div>
    )
}

export default ProfileView