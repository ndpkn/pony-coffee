import MainButtonLink from '../../components/ui/MainButtonLink'
import MainButtonType from '../../components/ui/MainButtonType'
import styles from '../../styles/ChangeProfile.module.scss'
import ErrorMessage from '../ui/ErrorMessage'
import GoBackButton from '../ui/GoBackButton'
import Input from '../ui/Input'
import PageHeader from '../ui/PageHeader'

const ProfileChangeNameView = ({ handleSubmit, handleChange, errors }) => {
	// добавить поле ввода кода и отправку новой почты
	return (
		<div className={styles.changeProfile}>
			<GoBackButton />
			<PageHeader text='Укажите другое имя' />
			<form
				className={styles.changeProfile_form}
				method='POST'
				onSubmit={handleSubmit}
			>
				<Input
					onChange={handleChange}
					name='changeName'
					type='tel'
					placeholder='Введите имя'
				/>
				{/* <label 
              className={styles.changeProfile_label} 
              style={{marginBottom: '2rem'}} 
              htmlFor="changeName"
              >Например: Иван
              </label> */}
				<ErrorMessage textError={errors} />
				<MainButtonType
					buttonName='сохранить'
					action='success'
					type='submit'
				/>
			</form>
		</div>
	)
}

export default ProfileChangeNameView
