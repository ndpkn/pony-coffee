import React from 'react'
import Layout from '../components/layout/Layout'
import ProfileView from '../components/screens/ProfileView'

const Profile = () => {
    return (
        <Layout title='Личный кабинет'>
            <ProfileView/>
        </Layout>
    )
}

export default Profile