import styles from '../../styles/CoffeePot.module.scss'
import EditButton from '../../components/ui/EditButton'
import MainButtonLink from '../../components/ui/MainButtonLink'
import ErrorMessage from '../../components/ui/ErrorMessage'
import LoadingMessage from '../../components/ui/LoadingMessage'

const BaristaPageView = ({barista, loading, error}) => {
    const items =  barista.map((item, i) => {
        const address = item.user_coffee_pot ? item.user_coffee_pot.coffee_pot : null
        return (
            <div key={i}>
                <EditButton
                    currentValue={`${address == null ? 'Нет места работы' : address.address}`}
                    actionName={`${item.name == null ? "Нет имени" : item.name} ${item.last_name == null ? "" : item.last_name} `}
                    link={`barista/${item.id}`}/>
            </div>
            )
    })

    const errorMessage = error ? <ErrorMessage/>: null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? items : null

return (
        <div 
            className={styles.coffeePot}
        >
            <h1 style={{
                marginBottom:'3rem'
            }}>Сотрудники</h1>

            {errorMessage}
            {spinner}
            {content}

            <MainButtonLink buttonName='Добавить сотрудника' action='access' href='barista/add'/>
        </div>
)
}

export default BaristaPageView