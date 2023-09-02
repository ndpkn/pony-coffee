import React, { useState } from 'react'
import Layout from '../../components/Layout'
import SendingView from '../../components/screens/SendingView'
import PonyService from '../../services/PonyServices'

const Seending = () => {
	const [loaded, setLoaded] = useState(false)
	const [error, setError] = useState(false)
	const [errors, setErrors] = useState([])

	const ponyService = new PonyService()

	const onSubmit = data => {
		ponyService
			.addNotification(data)
			.then(onNotificationPosted)
			.catch(onError)
	}

	//успешно отправлено
	const onNotificationPosted = () => {
		setLoaded(true)
		setError(false)
	}

	//при загрузке произошла ошибка
	const onError = err => {
		const errorMessage = err.response.data.errors.messages
		setErrors(errorMessage)
		setError(true)
		setLoaded(false)
		console.log(err)
	}

	return (
		<Layout title='Рассылка'>
			<SendingView
				onSubmit={onSubmit}
				error={error}
				loaded={loaded}
				errors={errors}
				onNotificationPosted={onNotificationPosted}
			/>
		</Layout>
	)
}

export default Seending
