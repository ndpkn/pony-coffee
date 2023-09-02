import Layout from '../../components/Layout'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import PonyService from '../../services/PonyServices'
import FeedbackView from '../../components/screens/FeedbackView'

const Feedback = () => {
	const [coffeePots, setCoffeePots] = useState([])
	const [errors, setErrors] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const options = [...coffeePots]
	const { handleSubmit, reset } = useForm()

	const ponyService = new PonyService()

	useEffect(() => {
		ponyService.getCoffeePot().then(onCoffeePotsLoaded).catch(onError)
	}, [])
	//данные загружены успешно
	const onCoffeePotsLoaded = coffeePotList => {
		setCoffeePots(
			coffeePotList,
			coffeePotList.unshift({
				id: 0,
				address: 'Выберите место для отзыва',
			})
		)
		setLoading(false)
	}
	//при загрузке произошла ошибка
	const onError = () => {
		setError(true)
		setLoading(false)
	}

	const onSubmit = data => {
		console.log('отправлено:', data)
		ponyService.addFeedback(data).then(onAddFeedback).catch(onAddError)

		reset({
			text: '',
			grade: '',
		})
	}
	const onAddFeedback = () => {
		window.location.href = '/feedback/history'
	}
	const onAddError = err => {
		console.log(err)
		setErrors(err.response.data.errors.messages)
	}

	return (
		<Layout
			title='Обратная связь'
			descr='Оставьте свое мнение о работе нашей кофейни'
		>
			<FeedbackView
				options={options}
				error={error}
				loading={loading}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				errors={errors}
			/>
		</Layout>
	)
}

export default Feedback
