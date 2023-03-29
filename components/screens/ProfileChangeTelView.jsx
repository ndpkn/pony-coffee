import MainButtonLink from '../../components/ui/MainButtonLink'
import MainButtonType from '../../components/ui/MainButtonType'
import styles from '../../styles/ChangeProfile.module.scss'
import ErrorMessage from '../ui/ErrorMessage'
import Input from '../ui/Input'

const ProfileChangeTelView = ({handleSubmit, handleChange, errors}) => {
  //добавить поле ввода кода
  
  return (
    <div className={styles.changeProfile}>
      <h1 className={styles.changeProfile_header}>Укажите новый номер</h1>
      <form 
        className={styles.changeProfile_form} 
        method="post"
        onSubmit={handleSubmit}>
          <Input 
            onChange={handleChange} 
            name='changeTel' 
            type="tel" 
            placeholder='Новый номер телефона' 
          />
          {/* <label 
            className={styles.changeProfile_label} 
            htmlFor="changeTel">Например: +78986735473
          </label> */}
          <div className={styles.code_block}>
              <button className={styles.code_btn} onClick={(e) => getCode(e, user.phone) }>Получить код</button>
              <input 
                  className={styles.code_input} 
                  type="text" 
                  name="code" 
                  placeholder='Введите код'
                  maxLength={4}
                  onChange={handleChange}/>
          </div>
          <label 
            className={styles.changeProfile_label} 
            style={{marginBottom: '2.5rem'}} 
            htmlFor="changeTel">Иногда СМС приходят с задержкой</label>
          <ErrorMessage textError={errors}/>
          <MainButtonType 
            buttonName='сохранить' 
            action='success' 
            type='submit'/>
      </form>
      <MainButtonLink 
        buttonName='Вернуться в профиль' 
        action='confirm' 
        href='/profile'
      />
    </div>
  )
}

export default ProfileChangeTelView