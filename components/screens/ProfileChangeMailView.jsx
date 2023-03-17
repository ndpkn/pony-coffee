import MainButtonLink from '../../components/ui/MainButtonLink'
import MainButtonType from '../../components/ui/MainButtonType'
import styles from '../../styles/ChangeProfile.module.scss'
import ErrorMessage from '../ui/ErrorMessage'
import Input from '../ui/Input'

const ProfileChangeMailView = ({handleSubmit, handleChange, errors}) => {
    // ПОЛУЧЕНИЕ КОДА НЕ РАБОТАЕТ
    return (
        <div className={styles.changeProfile}>
            <h1 className={styles.changeProfile_header}>Укажите новый адрес почты</h1>
            <form 
                className={styles.changeProfile_form} 
                method="post"
                onSubmit={handleSubmit}>
                <Input
                    onChange={handleChange} 
                    name='changeMail' 
                    type="mail" 
                    placeholder='Новый адрес почты'
                />
                {/* <label 
                    className={styles.changeProfile_label} 
                    style={{marginBottom: '1rem'}} 
                    htmlFor="changeMail">Например: pony-coffee@yandex.ru
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

export default ProfileChangeMailView