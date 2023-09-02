import InputEditButton from '../../components/ui/InputEditButton'
import MainButtonType from '../../components/ui/MainButtonType'
import MainButtonLink from '../../components/ui/MainButtonLink'
import PageHeader from '../../components/ui/PageHeader'
import ErrorMessage from '../../components/ui/ErrorMessage'
import LoadingMessage from '../../components/ui/LoadingMessage'
import DeleteConfirmation from '../ui/DeleteConfirmation'
import { useState } from 'react'

const CoffeePotIdPageView = ({
	handleSubmit,
	coffeePot,
	handleChangeAddress,
	handleChangeName,
	error,
	loading,
	deleteCoffeePot,
	pid,
	errors,
}) => {
	const [openDialog, setOpenDialog] = useState(false)

	const handleOpenDialog = () => {
		setOpenDialog(true)
	}
	const handleCloseDialog = () => {
		setOpenDialog(false)
	}

	const items = (
		<form action='' method='POST' onSubmit={handleSubmit}>
			<InputEditButton
				actionName='Введите новое название'
				currentValue={
					coffeePot.name == null ? 'Нет названия' : coffeePot.name
				}
				onChange={handleChangeName}
			/>
			<InputEditButton
				actionName='Введите новый адрес'
				currentValue={
					coffeePot.address == null ? 'Нет адреса' : coffeePot.address
				}
				onChange={handleChangeAddress}
			/>
			{errors != null ? <ErrorMessage textError={errors} /> : null}
			<MainButtonType
				buttonName='сохранить'
				action='success'
				type='submit'
			/>
			<MainButtonType
				buttonName='Удалить'
				action='danger'
				type='button'
				onClick={handleOpenDialog}
			/>
			<p
				style={{
					color: '#0000002B',
					marginTop: '1rem',
					marginBottom: '1rem',
					textAlign: 'center',
				}}
			>
				Дата создания:{' '}
				{coffeePot.created_at == null
					? 'Нет названия'
					: coffeePot.created_at.slice(0, 10)}
			</p>
			{/* <p style={{color:'#0000002B', marginTop:'1rem', marginBottom:'1rem'}}>Дата последнего редактирования: {coffeePot.updated_at == null ? 'Нет названия' : coffeePot.updated_at.slice(0,10)}</p> */}
		</form>
	)

	const errorMessage = error ? <ErrorMessage /> : null
	const spinner = loading ? <LoadingMessage /> : null
	const content = !(loading || error) ? items : null

	return (
		<div
			style={{
				padding: '3rem',
			}}
		>
			<PageHeader
				text={coffeePot.address != null ? coffeePot.address : ''}
			/>

			{errorMessage}
			{spinner}
			{content}

			<DeleteConfirmation
				handleCloseDialog={handleCloseDialog}
				openDialog={openDialog}
				onClick={() => deleteCoffeePot(pid)}
				cancel={'Отменить'}
				confirm={'Удалить'}
				title='Удаление кофейни'
				description='Вы действиительно хотите удалить эту кофейню?'
			/>

			<MainButtonLink
				buttonName='вернуться назад'
				action='confirm'
				href='/coffeePot'
			/>
		</div>
	)
}

export default CoffeePotIdPageView
