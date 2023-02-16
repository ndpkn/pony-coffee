import Layout from '../../../components/Layout'
import FeedbackHistoryView from '../../../components/screens/FeedbackHistoryView'

const FeedbackHistory = () => {
    return (
        <Layout title='Все обращения' descr='Все ваши обращения'>
            <FeedbackHistoryView/>
        </Layout>
    )
}

export default FeedbackHistory