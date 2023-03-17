import Input from './Input'
import styles from '../../styles/LoginForm.module.scss'
import MainButtonType from './MainButtonType'
import ErrorMessage from './ErrorMessage'

const LoginForm = ({handleChange, isShowPass, isShow, error, handleSubmit}) => {

    return (
        <div className={styles.formPage}>
            <h1 style={{ marginBottom: '2rem'}}>Вход</h1>
            <form onSubmit={handleSubmit} method='POST'>
                <div>
                    <Input 
                        name='phone' 
                        type="tel" 
                        placeholder='Телефон' 
                        onChange={handleChange}
                        pattern="\+?[0-9\s\-\(\)]+"
                    />
                    <Input 
                        name='password' 
                        type={isShow == false ? 'password' : 'text'} 
                        placeholder='Пароль'
                        onChange={handleChange}
                        isShowPass={isShowPass}
                        isShow={isShow}
                    />
                    <AuthError error={error}/>
                    <MainButtonType buttonName='Войти' action='confirm' type='submit'/>
                </div>
            </form>
        </div>
    )
}

const AuthError = ({error}) => {
    return (
        <div>
            {error != null ? error.map((item, i) => {
                return (<ErrorMessage key={i} textError={item}/>)
            }) : null}
        </div>
    )
}

export default LoginForm