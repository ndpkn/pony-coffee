import { useState } from 'react'
import Layout from '../../components/Layout'
import CoffeePotAddPageView from '../../components/screens/CoffeePotAddPageView'
import PonyService from '../../services/PonyServices'

const Add = () => {
	const ponyService = new PonyService()

	const [newCoffeePot, setNewCoffeePot] = useState({
		name: '',
		address: '',
	})

	const addNewCoffeePot = async (name, address) => {
		ponyService
			.addCoffeePot({ name, address })
			.then(onAddCoffeePot)
			.catch(onAddError)
	}
	const onAddCoffeePot = () => {
		window.location.href = '/coffeePot'
	}
	const onAddError = err => {
		console.log(err)
	}

	const handleChange = e => {
		setNewCoffeePot({
			...newCoffeePot,
			[e.target.name]: e.target.value,
		})
	}
	const onSubmit = e => {
		const { name, address } = newCoffeePot
		e.preventDefault()
		addNewCoffeePot(name, address)
	}
	return (
		<Layout title='Добавление кофейни' descr='Добавление кофейни'>
			<CoffeePotAddPageView
				onSubmit={onSubmit}
				handleChange={handleChange}
			/>
		</Layout>
	)
}

export default Add
