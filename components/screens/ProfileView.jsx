import Image from 'next/image'
import styles from '../../styles/Profile.module.scss'
import profileIcon from '../../images/profileIcon.svg'
import EditButton from '../ui/EditButton'
import MainButtonLink from '../ui/MainButtonLink'
import PageHeader from '../ui/PageHeader'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'

const ProfileView = ({profileData, bonuses, error, loading}) => {

    function getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100
        if (n >= 5 && n <= 20) {
            return five
        }
        n %= 10;
        if (n === 1) {
            return one
        }
        if (n >= 2 && n <= 4) {
            return two
        }
        return five
        }

    const items =   
        <>
        <div className={styles.profile_header}>
            <PageHeader text='Личный кабинет'/>
            <Image src={profileIcon} alt='profile icon'/>
            <p className={styles.profile_header_name}>{profileData.name}</p>
            <p className={styles.profile_header_id}>{`Ваш ID: ${profileData.id != null ? profileData.id : 'не найден'}`}</p>
            <p className={styles.profile_header_bonus}>{bonuses.count != undefined ? `У вас ${bonuses.count} ${getNoun(bonuses.count, 'бонус', 'бонуса', 'бонусов')}` : 'Бонусы не загружены'}</p>
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
    const content = !(loading || error) ? items : null

    return (
        <div className={styles.profile}>
                {errorMessage}
                {spinner}
                {content}
        </div>
    )
}

export default ProfileView