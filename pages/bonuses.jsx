import React from 'react'
import BonusesView from '../components/screens/BonusesView'
import Layout from '../components/Layout'

const Bonuses = () => {
    return (
        <Layout title='Добавление бонусов' descr='Добавление бонусов'>
            <BonusesView/>
        </Layout>
    )
}

export default Bonuses