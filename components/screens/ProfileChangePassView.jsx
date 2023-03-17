import MainButtonLink from '../../components/ui/MainButtonLink'
import MainButtonType from '../../components/ui/MainButtonType'
import styles from '../../styles/ChangeProfile.module.scss'
import ErrorMessage from '../ui/ErrorMessage'
import Input from '../ui/Input'

const ProfileChangePassView = ({handleSubmit, handleChange, handleChangeConfirm, errors, isShow, isShowPass}) => {
  return (
    <div className={styles.changeProfile}>
      <h1 className={styles.changeProfile_header}>Укажите новый пароль</h1>
      <form 
        className={styles.changeProfile_form} 
        method="post"
        onSubmit={handleSubmit}>
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
            style={{marginBottom: '2.5rem'}} 
            htmlFor="changePass">Пароль должен содержать минимум 8 символов</label>
          <ErrorMessage textError={errors}/>
          <MainButtonType 
            buttonName='Сохранить' 
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

export default ProfileChangePassView