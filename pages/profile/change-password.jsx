import Layout from '../../components/Layout'
import { useState } from 'react'
import ProfileChangePassView from '../../components/screens/ProfileChangePassView'
import PonyService from '../../services/PonyServices'

const ChangePassword = () => {
	const [userPass, setUserPass] = useState('')
	const [userPassConfirm, setUserPassConfirm] = useState('')
	const [isShow, setIsShow] = useState(false)
	const [errors, setErrors] = useState([])

	const ponyService = new PonyService()

	const handleChange = e => {
		setUserPass(e.target.value)
	}
	const handleChangeConfirm = e => {
		setUserPassConfirm(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault()

		ponyService
			.changePass({
				password: userPass,
				password_confirmation: userPassConfirm,
			})
			.then(onChangePass)
			.catch(onChangeError)
	}
	const onChangePass = res => {
		console.log(res)
		window.location.href = '/profile'
	}
	const onChangeError = err => {
		console.log(err)
		setErrors(err.response.data.errors.messages)
	}

	const isShowPass = e => {
		e.preventDefault()
		setIsShow(!isShow)
	}

	return (
		<Layout title='Изменение пароля'>
			<ProfileChangePassView
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				handleChangeConfirm={handleChangeConfirm}
				errors={errors}
				isShow={isShow}
				isShowPass={isShowPass}
			/>
		</Layout>
	)
}

export default ChangePassword
