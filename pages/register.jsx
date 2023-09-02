import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import RegisterForm from '../components/ui/RegisterForm'
import PonyService from '../services/PonyServices'
// import { loadReCaptcha } from 'recaptcha-v3-react-function-async'
import {
	loadReCaptcha,
	reCaptchaExecute,
} from 'recaptcha-v3-react-function-async'

const Register = () => {
	//ВОЗМОЖНЫ ОШИБКИ НУЖНО ПЕРЕПРОВЕРИТЬ
	const key = '6LdkKlgkAAAAAOYiR_jTMnuu2Rcdn_hO1ut3r3pJ'

	const [user, setUser] = useState({
		phone: '',
		password: '',
		password_confirmation: '',
		user_name: '',
		code: '',
		agreement: false,
		recaptcha: '',
	})
	const [isShow, setIsShow] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [errors, setErrors] = useState([])

	const ponyService = new PonyService()

	//кнопка и поле для ввода кода подтверждения под полем телефон
	//данные поля телефон брать для отправки запроса кода
	//выводить ошибку если не введен телефон или введен неверно

	// /call для запроса звонка
	useEffect(() => {
		loadReCaptcha(key)
			.then(() => {
				console.log('Recaptcha loaded')
			})
			.catch(err => {
				console.error('Error recaptcha', err)
			})
	}, [])

	const registerUser = async (
		phone,
		password,
		password_confirmation,
		name,
		agreement,
		code
	) => {
		let recaptcha = await reCaptchaExecute(key, 'setting')
		ponyService
			.register({
				phone,
				password,
				password_confirmation,
				name,
				agreement,
				code,
				recaptcha,
			})
			.then(onRegister)
			.catch(onError)
	}
	const onRegister = res => {
		console.log(res)
		setLoading(false)
		window.location.href = '/login'
		// localStorage.setItem('token', res.data.token.accessToken)
		// засунуть в редакс
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
		const {
			phone,
			password,
			password_confirmation,
			user_name,
			agreement,
			code,
		} = user
		e.preventDefault()
		registerUser(
			phone,
			password,
			password_confirmation,
			user_name,
			agreement,
			code
		)
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
	const isShowPass = e => {
		e.preventDefault()
		setIsShow(!isShow)
	}

	return (
		<Layout title='Регистрация'>
			<RegisterForm
				handleSubmit={handleSubmit}
				handleChange={handleChange}
				getCode={getCode}
				isShowPass={isShowPass}
				isShow={isShow}
				errors={errors}
				user={user}
			/>
		</Layout>
	)
}

export default Register
