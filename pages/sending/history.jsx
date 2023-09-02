import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import SendingHistoryView from '../../components/screens/SendingHistoryView'
import PonyService from '../../services/PonyServices'

const SendingHistory = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [errors, setErrors] = useState([])
	const [notifications, setNotifications] = useState([])

	const ponyService = new PonyService()

	useEffect(() => {
		ponyService
			.getAdminNotifications()
			.then(onNotificationsLoaded)
			.catch(onError)
	}, [])

	//данные загружены успешно
	const onNotificationsLoaded = notifications => {
		setNotifications(notifications)
		setLoading(false)
	}

	//при загрузке произошла ошибка
	const onError = err => {
		console.log(err)
		setError(true)
		setErrors(err.response.data.errors.messages)
		console.log(err.response.data.errors.messages)
		setLoading(false)
	}

	return (
		<Layout title='История рассылки'>
			<SendingHistoryView
				notifications={notifications}
				error={error}
				loading={loading}
			/>
		</Layout>
	)
}

export default SendingHistory
