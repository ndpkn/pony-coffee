import React from 'react'
import Layout from '../components/Layout'
import NotificationsView from '../components/screens/NotificationsView'

const Notifications = () => {
    return (
        <Layout title='Уведомления' descr='Все уведомления'>
            <NotificationsView/>
        </Layout>
    )
}

export default Notifications