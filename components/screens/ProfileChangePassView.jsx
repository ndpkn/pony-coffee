import MainButtonLink from '../../components/ui/MainButtonLink'
import MainButtonType from '../../components/ui/MainButtonType'
import styles from '../../styles/ChangeProfile.module.scss'
import ErrorMessage from '../ui/ErrorMessage'
import GoBackButton from '../ui/GoBackButton'
import Input from '../ui/Input'
import PageHeader from '../ui/PageHeader'

const ProfileChangePassView = ({
	handleSubmit,
	handleChange,
	handleChangeConfirm,
	errors,
	isShow,
	isShowPass,
}) => {
	return (
		<div className={styles.changeProfile}>
			<GoBackButton />
			<PageHeader text='Укажите новый пароль' />
			<form
				className={styles.changeProfile_form}
				method='post'
				onSubmit={handleSubmit}
			>
				<Input
					onChange={handleChange}
					name='password'
					type={isShow == false ? 'password' : 'text'}
					placeholder='Новый пароль'
					isShowPass={isShowPass}
					isShow={isShow}
				/>
				<Input
					onChange={handleChangeConfirm}
					name='password'
					type={isShow == false ? 'password' : 'text'}
					placeholder='Подтверждение нового пароля'
					isShowPass={isShowPass}
					isShow={isShow}
				/>
				<label
					className={styles.changeProfile_label}
					style={{ marginBottom: '2.5rem', maxWidth: '35rem' }}
					htmlFor='changePass'
				>
					Пароль должен содержать минимум 8 символов
				</label>
				<ErrorMessage textError={errors} />
				<MainButtonType
					buttonName='Сохранить'
					action='success'
					type='submit'
				/>
			</form>
		</div>
	)
}

export default ProfileChangePassView
