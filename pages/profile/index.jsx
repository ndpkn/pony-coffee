import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import PonyService from '../../services/PonyServices'
import ProfileView from '../../components/screens/ProfileView'

const Profile = () => {
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

    return (
        <Layout title='Личный кабинет'>
            <ProfileView profileData={profileData} bonuses={bonuses} error={error} loading={loading}/>
        </Layout>
    )
}

export default Profile