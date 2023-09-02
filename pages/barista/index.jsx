import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import PonyService from '../../services/PonyServices'
import BaristaPageView from '../../components/screens/BaristaPageView'

const Barista = () => {
	const [barista, setBarista] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const ponyService = new PonyService()

	// получения списка сотрудников
	useEffect(() => {
		ponyService.getBarista().then(onBaristaLoaded).catch(onError)
	}, [])

	//данные загружены успешно
	const onBaristaLoaded = baristaList => {
		setBarista(baristaList)
		setLoading(false)
	}

	//при загрузке произошла ошибка
	const onError = () => {
		setError(true)
		setLoading(false)
	}

	return (
		<Layout title='Список сотрудников' descr='Список сотрудников'>
			<BaristaPageView
				barista={barista}
				loading={loading}
				error={error}
			/>
		</Layout>
	)
}

export default Barista
