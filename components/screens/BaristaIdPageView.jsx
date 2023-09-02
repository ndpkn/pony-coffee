import styles from '../../styles/Feedback.module.scss'
import InputEditButton from '../../components/ui/InputEditButton'
import MainButtonType from '../../components/ui/MainButtonType'
import PageHeader from '../../components/ui/PageHeader'
import MainButtonLink from '../../components/ui/MainButtonLink'
import ErrorMessage from '../../components/ui/ErrorMessage'
import LoadingMessage from '../../components/ui/LoadingMessage'
import { useState } from 'react'
import DeleteConfirmation from '../ui/DeleteConfirmation'

const BaristaIdPageView = ({
	handleSubmit,
	handleChange,
	coffeePots,
	userCoffeePotId,
	errors,
	loading,
	error,
	barista,
	deleteBarista,
	pid,
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
				inputName='name'
				actionName='Введите имя'
				currentValue={
					barista.name == null ? 'Нет названия' : barista.name
				}
				onChange={handleChange}
			/>
			<InputEditButton
				inputName='last_name'
				actionName='Введите фамилию'
				currentValue={
					barista.last_name == null
						? 'Фамилия не указана'
						: barista.last_name
				}
				onChange={handleChange}
			/>
			<InputEditButton
				inputName='phone'
				actionName='Введите номер'
				currentValue={
					barista.phone == null ? 'Номер не указан' : barista.phone
				}
				onChange={handleChange}
			/>
			<select
				className={styles.select}
				name='coffeePot'
				onChange={handleChange}
				value={barista.coffeePot}
				defaultValue={userCoffeePotId}
			>
				{coffeePots.map((item, i) => {
					return (
						<option key={i} value={item.id}>
							{item.address}
						</option>
					)
				})}
			</select>
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
			<PageHeader text='сотрудник' />

			{errorMessage}
			{spinner}
			{content}

			<DeleteConfirmation
				handleCloseDialog={handleCloseDialog}
				openDialog={openDialog}
				onClick={() => deleteBarista(pid)}
				cancel={'Отменить'}
				confirm={'Удалить'}
				title='Удаление сотрудника'
				description='Вы действительно хотите удалить этого сотрудника?'
			/>

			<MainButtonLink
				buttonName='вернуться назад'
				action='confirm'
				href='/barista'
			/>
		</div>
	)
}

export default BaristaIdPageView
