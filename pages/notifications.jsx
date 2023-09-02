import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import NotificationsView from '../components/screens/NotificationsView'
import PonyService from '../services/PonyServices'

const Notifications = () => {
	const ponyService = new PonyService()
	const [notifications, setNotifications] = useState([])
	const [errors, setErrors] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	useEffect(() => {
		ponyService.getNotifications().then(onNotifLoaded).catch(onNotifError)
	}, [])

	const onNotifLoaded = notifications => {
		setLoading(false)
		setNotifications(notifications)
	}
	const onNotifError = err => {
		setError(true)
		setErrors(err.response.data.errors.messages)
	}

	const removeNotif = id => {
		ponyService
			.readNotification(id)
			.then(onNotifRead(id))
			.catch(onNotifReadError)
	}
	const onNotifRead = id => {
		setNotifications(notifications.filter(item => item.id !== id))
	}
	const onNotifReadError = err => {
		console.log(err)
	}

	return (
		<Layout title='Уведомления' descr='Все уведомления'>
			<NotificationsView
				notifications={notifications}
				loading={loading}
				error={error}
				errors={errors}
				removeNotif={removeNotif}
			/>
		</Layout>
	)
}

export default Notifications
