import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import PonyService from '../../../services/PonyServices'
import FeedbackAdminView from '../../../components/screens/FeedbackAdminView'

const FeedbackAdmin = () => {
	const [feedbacks, setFeedbacks] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const ponyService = new PonyService()

	// получения списка сотрудников
	useEffect(() => {
		ponyService.getFeedbacksAdmin().then(onFeedbacksLoaded).catch(onError)
	}, [])

	//данные загружены успешно
	const onFeedbacksLoaded = feedbacksList => {
		setFeedbacks(feedbacksList)
		setLoading(false)
	}

	//при загрузке произошла ошибка
	const onError = () => {
		setError(true)
		setLoading(false)
	}

	return (
		<Layout title='История обращений' descr='История ваших обращений'>
			<FeedbackAdminView
				feedbacks={feedbacks}
				error={error}
				loading={loading}
			/>
		</Layout>
	)
}

export default FeedbackAdmin
