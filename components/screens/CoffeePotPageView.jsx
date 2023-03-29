import styles from '../../styles/CoffeePot.module.scss'
import EditButton from '../../components/ui/EditButton'
import MainButtonLink from '../../components/ui/MainButtonLink'
import ErrorMessage from '../../components/ui/ErrorMessage'
import LoadingMessage from '../../components/ui/LoadingMessage'

const CoffeePotPageView = ({coffeePot, error, loading }) => {
    const items = coffeePot.map((item, i) => {
        return (
            <div key={i}>
                <EditButton
                    actionName={item.address}
                    currentValue={item.name == null ? "Нет названия" : item.name}
                    link={`coffeePot/${item.id}`}
                    />
            </div>
            )
        })
    
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? items : null
        
    return (
            <div 
                className={styles.coffeePot}
            >
                <h1 style={{
                    marginBottom:'3rem'
                }}>кофейни</h1>
                
                {errorMessage}
                {spinner}
                {content}

                <MainButtonLink buttonName='Добавить кофейню' action='success' href='coffeePot/add'/>
            </div>

    )
}

export default CoffeePotPageView