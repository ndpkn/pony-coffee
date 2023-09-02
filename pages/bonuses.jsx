import React from 'react'
import BonusesView from '../components/screens/BonusesView'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import PonyService from '../services/PonyServices'

const Bonuses = () => {
	const [allUsers, setAllusers] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [reload, setReload] = useState(false)
	const [writeOff, setWriteOff] = useState(0)
	const [messages, setMessages] = useState([])

	const ponyService = new PonyService()

	// получение данных
	useEffect(() => {
		ponyService.getBonuses().then(onBonusesLoaded).catch(onError)
		ponyService.getBonusConfig().then(onBonusesConfigLoaded).catch(onError)
	}, [reload])

	//данные загружены успешно
	const onBonusesLoaded = bonusesList => {
		setAllusers(bonusesList)
		setLoading(false)
	}
	const onBonusesConfigLoaded = bonusesConfig => {
		setWriteOff(bonusesConfig.writeOffQuantity)
		setLoading(false)
	}

	//при загрузке произошла ошибка
	const onError = err => {
		setError(true)
		setLoading(false)
		console.log(err)
	}

	const [searchTerm, setSearchTerm] = useState('')
	const [bonusCount, setBonusCount] = useState(0)
	const [id, setId] = useState(null)

	const [openDialogAdd, setOpenDialogAdd] = useState(false)
	const [openDialogRemove, setOpenDialogRemove] = useState(false)

	const handleOpenDialogAdd = id => {
		setOpenDialogAdd(true)
		setId(id)
	}
	const handleCloseDialogAdd = () => {
		setBonusCount(0)
		setOpenDialogAdd(false)
	}
	const handleOpenDialogRemove = id => {
		setOpenDialogRemove(true)
		setId(id)
	}
	const handleCloseDialogRemove = () => {
		setBonusCount(0)
		setOpenDialogRemove(false)
	}

	const filteredUsers = allUsers.filter(item => {
		return item.phone.includes(searchTerm)
	})
	// CHANGING BONUSES
	const addBonuses = id => {
		setBonusCount(prevState => prevState + 1)
		setId(id)
	}
	const removeBonuses = id => {
		setBonusCount(prevState => prevState - 1)
		setId(id)
	}

	//  ADD BONUSES IN DATABASE
	let data
	const postBonuses = (bonus, id) => {
		ponyService
			.addBonus((data = { count: bonus }), id)
			.then(onBonusesPosted)
			.catch(onBonusesPostedError)
	}
	const onBonusesPosted = res => {
		setReload(!reload)
		setMessages([])
	}
	const onBonusesPostedError = err => {
		console.log(err)
		setMessages(err.response.data.errors.messages)
	}

	//REMOVE BONUSES IN DATABASE
	const putBonuses = (bonus, id) => {
		ponyService
			.putBonus((data = { count: bonus }), id)
			.then(onBonusesPuted)
			.catch(onBonusesPutedError)
	}
	const onBonusesPuted = () => {
		setReload(!reload)
		setMessages([])
	}
	const onBonusesPutedError = err => {
		console.log(err)
		setMessages(err.response.data.errors.messages)
	}

	const resetCounter = () => {
		setBonusCount(0)
	}

	const sendBonuses = (bonus, id) => {
		bonus > 0
			? (handleCloseDialogAdd(), postBonuses(bonus, id))
			: (handleCloseDialogRemove(), putBonuses(bonus * -1, id))

		setBonusCount(0)
	}
	return (
		<Layout title='Добавление бонусов' descr='Добавление бонусов'>
			<BonusesView
				error={error}
				loading={loading}
				allUsers={allUsers}
				writeOff={writeOff}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				handleCloseDialogAdd={handleCloseDialogAdd}
				openDialogAdd={openDialogAdd}
				bonusCount={bonusCount}
				addBonuses={addBonuses}
				id={id}
				sendBonuses={sendBonuses}
				handleCloseDialogRemove={handleCloseDialogRemove}
				openDialogRemove={openDialogRemove}
				removeBonuses={removeBonuses}
				filteredUsers={filteredUsers}
				setBonusCount={setBonusCount}
				handleOpenDialogAdd={handleOpenDialogAdd}
				handleOpenDialogRemove={handleOpenDialogRemove}
				messages={messages}
				resetCounter={resetCounter}
			/>
		</Layout>
	)
}

export default Bonuses
