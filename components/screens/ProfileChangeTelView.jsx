import MainButtonLink from '../../components/ui/MainButtonLink'
import MainButtonType from '../../components/ui/MainButtonType'
import styles from '../../styles/ChangeProfile.module.scss'
import ErrorMessage from '../ui/ErrorMessage'
import GoBackButton from '../ui/GoBackButton'
import Input from '../ui/Input'
import LoadedMessage from '../ui/LoadedMessage'
import PageHeader from '../ui/PageHeader'

const ProfileChangeTelView = ({handleSubmit, errors, getCode, userTel, handleChangePhone, handleChangeCode, success}) => {
  //добавить поле ввода кода
  
  return (
    <div className={styles.changeProfile}>
      <GoBackButton/>
      <PageHeader text='Укажите новый номер'/>
      <form 
        className={styles.changeProfile_form} 
        method="post"
        onSubmit={handleSubmit}>
          <Input 
            onChange={handleChangePhone} 
            name='changeTel' 
            type="tel" 
            placeholder='Новый номер телефона' 
          />
          {/* <label 
            className={styles.changeProfile_label} 
            htmlFor="changeTel">Например: +78986735473
          </label> */}
          <div className={styles.code_block}>
              <button className={styles.code_btn} onClick={(e) => getCode(e, userTel) }>Получить код</button>
              <input 
                  className={styles.code_input} 
                  type="text" 
                  name="code" 
                  placeholder='Введите код'
                  maxLength={4}
                  onChange={handleChangeCode}/>
          </div>
          <label 
            className={styles.changeProfile_label} 
            style={{marginBottom: '2.5rem', maxWidth: '35rem'}} 
            htmlFor="changeTel">Введите последние 4 цифры номера входящего звонка</label>
          <ErrorMessage textError={errors}/>
          <LoadedMessage textSuccess={success}/>
          <MainButtonType 
            buttonName='сохранить' 
            action='success' 
            type='submit'/>
      </form>
    </div>
  )
}

export default ProfileChangeTelView