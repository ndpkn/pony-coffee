import Layout from '../../components/Layout'
import FeedbackHistoryView from '../../components/screens/FeedbackHistoryView'

const History = () => {
    return (
        <Layout title='История обращений' descr='История ваших обращений'>
            <FeedbackHistoryView/>
        </Layout>
    )
}

export default History