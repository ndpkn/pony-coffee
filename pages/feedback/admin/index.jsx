import React from 'react'
import Layout from '../../../components/Layout'
import FeedbackAdminView from '../../../components/screens/FeedbackAdminView'

const FeedbackAdmin = () => {
    return (
        <Layout title='История обращений' descr='История ваших обращений'>
            <FeedbackAdminView/>
        </Layout>
    )
}

export default FeedbackAdmin