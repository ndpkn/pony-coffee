import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import PonyService from '../../services/PonyServices'
import CoffeePotPageView from '../../components/screens/CoffeePotPageView'

const CoffeePot = () => {
	const [coffeePot, setCoffeePot] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const ponyService = new PonyService()

	// получение данных
	useEffect(() => {
		ponyService.getCoffeePot().then(onCoffeePotLoaded).catch(onError)
	}, [])

	//данные загружены успешно
	const onCoffeePotLoaded = coffeePotList => {
		setCoffeePot(coffeePotList)
		setLoading(false)
	}

	//при загрузке произошла ошибка
	const onError = () => {
		setError(true)
		setLoading(false)
	}

	return (
		<Layout title='Список кофеен' descr='Список кофеен'>
			<CoffeePotPageView
				coffeePot={coffeePot}
				loading={loading}
				error={error}
			/>
		</Layout>
	)
}

export default CoffeePot
