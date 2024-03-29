import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import UserStatView from '../../components/screens/UserStatView'
import PonyService from '../../services/PonyServices'

const UserStat = () => {
	const [activeKey, setActiveKey] = useState('')
	const [data, setData] = useState([])
	const [searchTerm, setSearchTerm] = useState('')

	const [userInfo, setUserInfo] = useState([])
	const [userInfoMonth, setUserInfoMonth] = useState([])
	const [userInfoWeek, setUserInfoWeek] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	function SortByName(x, y) {
		return x.name.localeCompare(y.name)
	}
	function SortByPhone(x, y) {
		return x.phone.localeCompare(y.phone)
	}
	function SortByBonuses(x, y) {
		return y.active_bonuses_count - x.active_bonuses_count
		// return x.active_bonuses_count.localeCompare(y.active_bonuses_count)
	}
	function SortByBurnt(x, y) {
		return y.burnt_bonuses_count - x.burnt_bonuses_count
	}
	function SortByUsing(x, y) {
		return y.using_bonuses_count - x.using_bonuses_count
	}
	function SortById(x, y) {
		return x.id - y.id
	}
	// function SortByMonth(x,y){
	//     return userInfoMonth
	// }
	// function SortByCreate(x,y){
	//     return x.created_at.localeCompare(y.created_at)
	// }

	const ponyService = new PonyService()

	// получение списка пользователей
	useEffect(() => {
		ponyService.getUserStat().then(onUserInfoLoaded).catch(onError)
	}, [])

	//данные загружены успешно
	const onUserInfoLoaded = userInfoList => {
		setUserInfo(userInfoList.users)
		setUserInfoMonth(userInfoList.users_data_month)
		setUserInfoWeek(userInfoList.users_data_week)

		setData(userInfoList.users)
		setLoading(false)
	}

	//при загрузке произошла ошибка
	const onError = err => {
		console.log(err)
		setError(true)
		setLoading(false)
	}

	const getSearchTerm = e => {
		setSearchTerm(e.target.value)
	}

	//изменение массива при клике
	useEffect(() => {
		let newArr
		switch (activeKey) {
			case 'byName':
				newArr = [...data.sort(SortByName)]
				setUserInfo(newArr)
				break
			case 'byPhone':
				newArr = [...data.sort(SortByPhone)]
				setUserInfo(newArr)
				break
			case 'byQnt':
				newArr = [...data.sort(SortByBonuses)]
				setUserInfo(newArr)
				break
			case 'byUsed':
				newArr = [...data.sort(SortByUsing)]
				setUserInfo(newArr)
				break
			case 'byBurnt':
				newArr = [...data.sort(SortByBurnt)]
				setUserInfo(newArr)
				break
			case 'byId':
				newArr = [...data.sort(SortById)]
				setUserInfo(newArr)
				break
			case 'byMonth':
				newArr = [...userInfoMonth.sort(SortByBonuses)]
				setUserInfo(newArr)
				break
			case 'byWeek':
				newArr = [...userInfoWeek.sort(SortByBonuses)]
				setUserInfo(newArr)
				break
			case 'all':
				newArr = [...data.sort(SortById)]
				setUserInfo(newArr)
				break
			default:
				setUserInfo(data)
		}
	}, [activeKey])

	//фильтрация списка по номеру телефона
	const filteredUserInfo = userInfo.filter(item => {
		return item.phone.includes(searchTerm)
	})

	//получение значения по клику
	const getKey = key => {
		setActiveKey(activeKey === key ? 'all' : key)
	}

	return (
		<Layout title='Статистика пользователя'>
			<UserStatView
				filteredUserInfo={filteredUserInfo}
				error={error}
				loading={loading}
				getSearchTerm={getSearchTerm}
				searchTerm={searchTerm}
				getKey={getKey}
				activeKey={activeKey}
			/>
		</Layout>
	)
}

export default UserStat
