import MainButtonLink from '../../components/ui/MainButtonLink'
import MainButtonType from '../../components/ui/MainButtonType'
import styles from '../../styles/ChangeProfile.module.scss'

const ProfileChangePassView = ({handleSubmit, handleChange, handleChangeConfirm}) => {
  return (
    <div className={styles.changeProfile}>
      <h1 className={styles.changeProfile_header}>Укажите новый пароль</h1>
      <form 
        className={styles.changeProfile_form} 
        method="post"
        onSubmit={handleSubmit}>
          <input 
            onChange={handleChange} 
            className={styles.changeProfile_input} 
            style={{marginBottom: '3rem'}} 
            name='changeTel' 
            type="password" 
            placeholder='Новый пароль' />
          <input 
            onChange={handleChangeConfirm} 
            className={styles.changeProfile_input} 
            name='changePass' 
            type="password" 
            placeholder='Подтверждение нового пароля' />
          <label 
            className={styles.changeProfile_label} 
            style={{marginBottom: '2.5rem'}} 
            htmlFor="changePass">Пароль должен содержать минимум 8 символов</label>
          <MainButtonType 
            buttonName='Изменить пароль' 
            action='confirm' 
            type='submit'/>
      </form>
      <MainButtonLink 
        buttonName='Вернуться в профиль' 
        action='warning' 
        href='/profile'/>
  </div>
  )
}

export default ProfileChangePassView