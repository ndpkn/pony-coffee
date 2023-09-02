import Input from '../../components/ui/Input'
import PageHeader from '../../components/ui/PageHeader'
import styles from '../../styles/Feedback.module.scss'
import MainButtonType from '../../components/ui/MainButtonType'
import PhoneInput from '../../components/ui/PhoneInput'
import MainButtonLink from '../../components/ui/MainButtonLink'

const BaristaAddPageView = ({
	coffeePots,
	errors,
	loading,
	error,
	isShow,
	handleChange,
	isShowPass,
	onSubmit,
}) => {
	const coffeePotsItems = coffeePots.map((item, i) => {
		return (
			<option key={i} value={item.id}>
				{item.address}
			</option>
		)
	})

	const errorMessage = error ? <option>Ошибка загрузки данных</option> : null
	const spinner = loading ? <option>Загрузка ...</option> : null
	const content = !(loading || error) ? coffeePotsItems : null

	return (
		<div
			style={{
				padding: '3rem',
			}}
		>
			<PageHeader text='Добавление сотрудника' />
			<form method='POST' onSubmit={onSubmit}>
				<Input
					name='name'
					type='text'
					placeholder='Имя'
					onChange={handleChange}
				/>
				<Input
					name='last_name'
					type='text'
					placeholder='Фамилия'
					onChange={handleChange}
				/>
				<PhoneInput
					name='phone'
					type='tel'
					placeholder='Телефон'
					onChange={handleChange}
					pattern='\+?[0-9\s\-\(\)]+'
				/>
				<select
					className={styles.select}
					name='coffee_pot_id'
					onChange={handleChange}
				>
					{errorMessage}
					{spinner}
					{content}
				</select>
				<Input
					name='password'
					type={isShow == false ? 'password' : 'text'}
					placeholder='Пароль'
					minLength='8'
					onChange={handleChange}
					isShowPass={isShowPass}
					isShow={isShow}
				/>
				<Input
					name='password_confirmation'
					type={isShow == false ? 'password' : 'text'}
					placeholder='Подтвердите пароль'
					minLength='8'
					onChange={handleChange}
					isShowPass={isShowPass}
					isShow={isShow}
				/>
				{errors == null
					? ''
					: errors.map((item, i) => {
							return (
								<p
									style={{
										marginTop: '2rem',
										marginBottom: '2rem',
										color: 'red',
									}}
									key={i}
								>
									{item}
								</p>
							)
					  })}
				<MainButtonType
					buttonName='добавить'
					action='success'
					type='submit'
				/>
				<MainButtonLink
					buttonName='Вернуться назад'
					action='confirm'
					href='/barista'
				/>
			</form>
		</div>
	)
}

export default BaristaAddPageView
