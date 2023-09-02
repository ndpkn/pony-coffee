import { useState } from 'react'
import Layout from '../../components/Layout'
import ProfileChangeNameView from '../../components/screens/ProfileChangeNameView'
import PonyService from '../../services/PonyServices'

const ChangeName = () => {
	const [userName, setUserName] = useState('')
	const [errors, setErrors] = useState([])
	const ponyService = new PonyService()

	const handleChange = e => {
		setUserName(e.target.value)
	}
	const handleSubmit = e => {
		e.preventDefault()

		ponyService
			.changeName({
				name: userName,
			})
			.then(onChangeName)
			.catch(onChangeError)
	}
	const onChangeName = res => {
		console.log(res)
		window.location.href = '/profile'
	}
	const onChangeError = err => {
		console.log(err)
		setErrors(err.response.data.errors.messages)
	}

	return (
		<Layout title='Изменение имени'>
			<ProfileChangeNameView
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				errors={errors}
			/>
		</Layout>
	)
}

export default ChangeName
