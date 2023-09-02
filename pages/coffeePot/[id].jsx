import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import PonyService from '../../services/PonyServices'
import CoffeePotIdPageView from '../../components/screens/CoffeePotIdPageView'

const CoffeePotPage = () => {
	const router = useRouter()
	const pid = router.query.id

	const [coffeePot, setCoffeePot] = useState([])
	const [errors, setErrors] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [changeCoffeePotName, setChangeCoffeePotName] = useState('')
	const [changeCoffeePotAddress, setChangeCoffeePotAddress] = useState('')

	const ponyService = new PonyService()

	useEffect(() => {
		if (!pid) {
			return
		}
		ponyService.getCoffeePotPage(pid).then(onCoffeePotLoaded).catch(onError)
	}, [pid])
	//данные загружены успешно
	const onCoffeePotLoaded = coffeePotList => {
		setCoffeePot(coffeePotList)
		setChangeCoffeePotName(coffeePotList.name)
		setChangeCoffeePotAddress(coffeePotList.address)
		setLoading(false)
	}
	//при загрузке произошла ошибка
	const onError = err => {
		console.log(err)
		setError(true)
		setLoading(false)
	}

	//изменение данных кофейни
	const changeCoffeePot = async (name, address) => {
		ponyService
			.changeCoffeePot(
				{
					name: name,
					address: address,
				},
				pid
			)
			.then(onChangeCoffePot)
			.catch(onChangeError)
	}
	const onChangeCoffePot = () => {
		window.location.href = `/coffeePot`
	}
	const onChangeError = err => {
		console.log(err)
		setErrors(err.response.data.errors.messages)
	}

	//получение данных из полей ввода
	const handleChangeName = e => {
		setChangeCoffeePotName(e.target.value)
	}
	const handleChangeAddress = e => {
		setChangeCoffeePotAddress(e.target.value)
	}
	//отправка формы
	const handleSubmit = e => {
		e.preventDefault()
		changeCoffeePot(changeCoffeePotName, changeCoffeePotAddress)
	}

	//удаление кофейни
	const deleteCoffeePot = pid => {
		ponyService
			.deleteCoffeePot(pid)
			.then(onDeleteCoffeePot)
			.catch(onDeleteError)
	}
	const onDeleteCoffeePot = () => {
		window.location.href = '/coffeePot'
	}
	const onDeleteError = err => {
		console.log(err)
	}
	return (
		<Layout title='Страница кофейни' descr='страница кофейни'>
			<CoffeePotIdPageView
				handleSubmit={handleSubmit}
				coffeePot={coffeePot}
				handleChangeAddress={handleChangeAddress}
				handleChangeName={handleChangeName}
				errors={errors}
				error={error}
				loading={loading}
				deleteCoffeePot={deleteCoffeePot}
				pid={pid}
			/>
		</Layout>
	)
}

export default CoffeePotPage
