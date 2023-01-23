import React from 'react'
import Layout from '../../components/Layout'
import UserStatView from '../../components/screens/UserStatView'

const UserStat = () => {
    return (
        <Layout title='Статистика пользователя'>
            <UserStatView/>
        </Layout>
    )
}

export default UserStat