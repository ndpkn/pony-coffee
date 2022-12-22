import React from 'react'
import Layout from '../../components/Layout'
import MainButtonLink from '../../components/ui/MainButtonLink'
import MainButtonType from '../../components/ui/MainButtonType'
import styles from '../../styles/ChangeProfile.module.scss'

const ChangeTel = () => {
    return (
        <Layout title='Изменение телефона'>
            <div className={styles.changeProfile}>
                <h1 className={styles.changeProfile_header}>Укажите новый номер</h1>
                <form className={styles.changeProfile_form} action="" method="post">
                    <input className={styles.changeProfile_input} name='changeTel' type="tel" placeholder='Новый номер телефона' />
                    <label className={styles.changeProfile_label} htmlFor="changeTel">Например: +78986735473</label>
                    <label className={styles.changeProfile_label} style={{marginBottom: '2.5rem'}} htmlFor="changeTel">Иногда СМС приходят с задержкой</label>
                    <MainButtonType buttonName='Изменить номер' action='confirm' type='submit'/>
                </form>
                <MainButtonLink buttonName='Вернуться в профиль' action='warning' href='/profile'/>
            </div>
        </Layout>
    )
}

export default ChangeTel