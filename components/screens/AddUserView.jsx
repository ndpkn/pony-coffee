import Input from '../ui/Input'
import PageHeader from '../ui/PageHeader'
import styles from '../../styles/LoginForm.module.scss'
import MainButtonType from '../ui/MainButtonType'
import ErrorMessage from '../ui/ErrorMessage'

const AddUserView = ({ handleSubmit, handleChange, getCode, errors, user }) => {
	return (
		<div
			style={{
				padding: '3rem',
			}}
		>
			<PageHeader text='Добавление пользователя' />
			<form method='POST' onSubmit={handleSubmit}>
				<Input
					name='phone'
					type='tel'
					placeholder='Телефон'
					onChange={handleChange}
					pattern='\+?[0-9\s\-\(\)]+'
				/>
				<div className={styles.code}>
					<div className={styles.code_block}>
						<button
							className={styles.code_btn}
							onClick={e =>
								getCode(e, user.phone, user.recaptcha)
							}
						>
							Получить код
						</button>
						<input
							className={styles.code_input}
							type='text'
							name='code'
							placeholder='Введите код'
							maxLength={4}
							onChange={handleChange}
						/>
					</div>
					<p className={styles.code_label}>
						Вам поступит звонок, введите последние 4 цифры номера
					</p>
				</div>
				{user.code.length == 4 ? (
					<>
						<Input
							name='name'
							type='text'
							placeholder='Имя'
							onChange={handleChange}
						/>
					</>
				) : null}
				{errors != null ? <ErrorMessage textError={errors} /> : null}
				<MainButtonType
					buttonName='Зарегистрировать'
					action='confirm'
					type='submit'
				/>
			</form>
		</div>
	)
}

export default AddUserView
