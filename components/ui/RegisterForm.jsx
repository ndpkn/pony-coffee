import styles from '../../styles/LoginForm.module.scss'
import ErrorMessage from './ErrorMessage'
import Input from './Input'
import MainButtonType from './MainButtonType'
import { Checkbox, FormControlLabel } from '@mui/material'

const RegisterForm = ({handleSubmit, handleChange, getCode, isShowPass, isShow, errors, user}) => {

    return (
        <div className={styles.formPage}>
            <h1 style={{ marginBottom: '2rem'}}>Регистрация</h1>
            <form onSubmit={handleSubmit} method='POST'>
                <div>
                    <Input 
                        name='phone'
                        type='tel' 
                        placeholder='Телефон' 
                        onChange={handleChange}
                        pattern="\+?[0-9\s\-\(\)]+"
                        />
                    <div className={styles.code}>
                        <div className={styles.code_block}>
                            <button className={styles.code_btn} onClick={(e) => getCode(e, user.phone, user.recaptcha) }>Получить код</button>
                            <input 
                                className={styles.code_input} 
                                type="text" 
                                name="code" 
                                placeholder='Введите код'
                                maxLength={4}
                                onChange={handleChange}/>
                        </div>
                        <p className={styles.code_label}>Вам поступит звонок, введите последние 4 цифры номера</p>
                        
                    </div>
                    {user.code.length == 4 ?
                    <>
                    <Input 
                        name='user_name' 
                        type="text" 
                        placeholder='Имя' 
                        onChange={handleChange}
                        />
                    <Input 
                        name='password' 
                        type={isShow == false ? 'password' : 'text'} 
                        placeholder='Пароль' 
                        onChange={handleChange}
                        isShowPass={isShowPass}
                        isShow={isShow}
                        />
                    <Input
                        name='password_confirmation' 
                        type={isShow == false ? 'password' : 'text'} 
                        placeholder='Подтверждение пароля' 
                        onChange={handleChange}
                        isShowPass={isShowPass}
                        isShow={isShow}
                        />
                    <div style={{
                        width: '35rem',
                        maxWidth: '35rem',
                        margin: '0 auto'
                    }}>
                        <FormControlLabel
                            name='agreement'
                            onChange={handleChange}
                            control={<Checkbox />} 
                            label="Согласие на использование персональных данных" 
                            sx={{ '& .MuiSvgIcon-root': { fontSize: '3rem' },
                                '& .MuiTypography-root': {fontSize: '1.5rem', lineHeight: '1.3rem', color:'#0000006c'}  }}  
                        />
                    </div>
                    </>
                    :
                    null
                    }

                    {errors != null 
                        ?
                        <ErrorMessage textError={errors}/>
                        :
                        null
                    }
                    <MainButtonType buttonName='Зарегистрироваться' action='confirm' type='submit'/>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm