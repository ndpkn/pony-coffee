import MainButtonLink from '../../components/ui/MainButtonLink'
import MainButtonType from '../../components/ui/MainButtonType'
import styles from '../../styles/ChangeProfile.module.scss'
import ErrorMessage from '../ui/ErrorMessage'
import Input from '../ui/Input'

const ProfileChangeNameView = ({handleSubmit, handleChange, errors}) => {
  
  // добавить поле ввода кода и отправку новой почты
  return (
    <div className={styles.changeProfile}>
      <h1 className={styles.changeProfile_header}>Укажите другое имя</h1>
      <form 
          className={styles.changeProfile_form} 
          method="POST" 
          onSubmit={handleSubmit}>
          <Input 
              onChange={handleChange} 
              name='changeName' 
              type="tel" 
              placeholder='Введите имя' 
          />
          {/* <label 
              className={styles.changeProfile_label} 
              style={{marginBottom: '2rem'}} 
              htmlFor="changeName"
              >Например: Иван
              </label> */}
          <ErrorMessage textError={errors}/>
          <MainButtonType 
              buttonName='сохранить' 
              action='access' 
              type='submit'/>
      </form>
      <MainButtonLink 
          buttonName='Вернуться в профиль' 
          action='confirm' 
          href='/profile'/>
  </div>
  )
}

export default ProfileChangeNameView