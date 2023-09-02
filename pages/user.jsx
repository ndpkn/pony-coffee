import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import AddUserView from '../components/screens/AddUserView'
import PonyService from '../services/PonyServices'
import {
	loadReCaptcha,
	reCaptchaExecute,
} from 'recaptcha-v3-react-function-async'

const AddUser = () => {
	const key = '6LdkKlgkAAAAAOYiR_jTMnuu2Rcdn_hO1ut3r3pJ'

	const [user, setUser] = useState({
		phone: '',
		user_name: '',
		code: '',
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [errors, setErrors] = useState([])

	const ponyService = new PonyService()

	useEffect(() => {
		loadReCaptcha(key)
			.then(() => {
				console.log('Recaptcha loaded')
			})
			.catch(err => {
				console.error('Error recaptcha', err)
			})
	}, [])

	const registerUser = async (phone, name, code) => {
		ponyService
			.createUser({ phone, name, code })
			.then(onRegister)
			.catch(onError)
	}
	const onRegister = res => {
		console.log(res)
		setLoading(false)
	}
	const onError = err => {
		setError(true)
		setLoading(false)
		setErrors(err.response.data.errors.messages)
		console.log(err)
	}

	const handleChange = event => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		})
	}
	const handleSubmit = e => {
		const { phone, user_name, code } = user
		e.preventDefault()
		registerUser(phone, user_name, code)
	}
	const getCode = async (e, phone) => {
		e.preventDefault()
		let recaptcha = await reCaptchaExecute(key, 'setting')
		ponyService
			.getCode({ phone, recaptcha })
			.then(onCodeReceived)
			.catch(onCodeError)
	}
	const onCodeReceived = res => {
		console.log(res)
	}
	const onCodeError = err => {
		// setErrors(err.response.data.errors.messages)
		setError(false)
		console.log(err)
	}

	return (
		<Layout title='Добавление пользователя'>
			<AddUserView
				handleSubmit={handleSubmit}
				handleChange={handleChange}
				getCode={getCode}
				errors={errors}
				user={user}
			/>
		</Layout>
	)
}

export default AddUser
