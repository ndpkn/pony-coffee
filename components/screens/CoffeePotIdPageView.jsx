import InputEditButton from '../../components/ui/InputEditButton'
import MainButtonType from '../../components/ui/MainButtonType'
import MainButtonLink from '../../components/ui/MainButtonLink'
import PageHeader from '../../components/ui/PageHeader'
import ErrorMessage from '../../components/ui/ErrorMessage'
import LoadingMessage from '../../components/ui/LoadingMessage'

const CoffeePotIdPageView = ({handleSubmit, coffeePot, handleChangeAddress, handleChangeName, error, loading, deleteCoffeePot, pid }) => {
    const items = 
        <form 
            action="" 
            method="POST" 
            onSubmit={handleSubmit}>
            <InputEditButton 
                actionName='Введите новое название'
                currentValue={coffeePot.name == null ? 'Нет названия' : coffeePot.name}
                onChange={handleChangeName}
                />
            <InputEditButton 
                actionName='Введите новый адрес'
                currentValue={coffeePot.address == null ? 'Нет адреса' : coffeePot.address}
                onChange={handleChangeAddress}/>
            <MainButtonType buttonName='сохранить' action='access' type='submit'/>
            <MainButtonType buttonName='Удалить' action='danger' type='submit' onClick={() => deleteCoffeePot(pid)}/>
            <p style={{color:'#0000002B', marginTop:'1rem'}}>Дата создания: {coffeePot.created_at == null ? 'Нет названия' : coffeePot.created_at.slice(0,10)}</p>
            <p style={{color:'#0000002B', marginTop:'1rem', marginBottom:'1rem'}}>Дата последнего редактирования: {coffeePot.updated_at == null ? 'Нет названия' : coffeePot.updated_at.slice(0,10)}</p>
        </form>

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? items : null

return (
        <div 
            style={{
                padding:'3rem'
        }}>
            <PageHeader text={coffeePot.address != null ? coffeePot.address : '' }/>
            
            {errorMessage}
            {spinner}
            {content}

            <MainButtonLink buttonName='вернуться назад' action='confirm' href='/coffeePot'/>

        </div>
)
}

export default CoffeePotIdPageView