import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react'
import PonyService from '../../../services/PonyServices'
import FeedbackHistoryView from '../../../components/screens/FeedbackHistoryView'

const FeedbackHistory = () => {
	const [feedbacks, setFeedbacks] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const ponyService = new PonyService()

	// получение данных
	useEffect(() => {
		ponyService.getFeedbackHistory().then(onFeedbackLoaded).catch(onError)
	}, [])

	//данные загружены успешно
	const onFeedbackLoaded = feedbackList => {
		setFeedbacks(feedbackList)
		setLoading(false)
	}

	//при загрузке произошла ошибка
	const onError = err => {
		console.log(err)
		setError(true)
		setLoading(false)
	}

	return (
		<Layout title='Все обращения' descr='Все ваши обращения'>
			<FeedbackHistoryView
				feedbacks={feedbacks}
				error={error}
				loading={loading}
			/>
		</Layout>
	)
}

export default FeedbackHistory
