import MainButtonLink from '../../components/ui/MainButtonLink'
import MainButtonType from '../../components/ui/MainButtonType'
import styles from '../../styles/ChangeProfile.module.scss'
import ErrorMessage from '../ui/ErrorMessage'
import GoBackButton from '../ui/GoBackButton'
import Input from '../ui/Input'
import LoadedMessage from '../ui/LoadedMessage'
import PageHeader from '../ui/PageHeader'

const ProfileChangeMailView = ({
	handleSubmit,
	handleChangeMail,
	errors,
	handleChangeCode,
	getCode,
	success,
}) => {
	// ПОЛУЧЕНИЕ КОДА НЕ РАБОТАЕТ
	return (
		<div className={styles.changeProfile}>
			<GoBackButton />
			<PageHeader text='Укажите новый адрес почты' />
			<form
				className={styles.changeProfile_form}
				method='post'
				onSubmit={handleSubmit}
			>
				<Input
					onChange={handleChangeMail}
					name='changeMail'
					type='mail'
					placeholder='Новый адрес почты'
				/>
				{/* <label 
                    className={styles.changeProfile_label} 
                    style={{marginBottom: '1rem'}} 
                    htmlFor="changeMail">Например: pony-coffee@yandex.ru
                </label> */}
				<div className={styles.code_block}>
					<button
						className={styles.code_btn}
						onClick={e => getCode(e)}
					>
						Получить код
					</button>
					<input
						className={styles.code_input}
						type='text'
						name='code'
						placeholder='Введите код'
						maxLength={4}
						onChange={handleChangeCode}
					/>
				</div>

				<ErrorMessage textError={errors} />
				<LoadedMessage textSuccess={success} />
				<MainButtonType
					buttonName='сохранить'
					action='success'
					type='submit'
				/>
			</form>
		</div>
	)
}

export default ProfileChangeMailView
