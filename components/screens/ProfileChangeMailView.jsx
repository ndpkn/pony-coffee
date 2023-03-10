import MainButtonLink from '../../components/ui/MainButtonLink'
import MainButtonType from '../../components/ui/MainButtonType'
import styles from '../../styles/ChangeProfile.module.scss'

const ProfileChangeMailView = ({handleSubmit, handleChange}) => {
    return (
        <div className={styles.changeProfile}>
            <h1 className={styles.changeProfile_header}>Укажите новый адрес почты</h1>
            <form 
                className={styles.changeProfile_form} 
                method="post"
                onSubmit={handleSubmit}>
                <input 
                    onChange={handleChange} 
                    className={styles.changeProfile_input}
                    name='changeMail' 
                    type="mail" 
                    placeholder='Новый адрес'/>
                <label 
                    className={styles.changeProfile_label} 
                    style={{marginBottom: '2.5rem'}} 
                    htmlFor="changeMail">Например: pony-coffee@yandex.ru</label>
                <MainButtonType 
                    buttonName='Изменить почту' 
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

export default ProfileChangeMailView