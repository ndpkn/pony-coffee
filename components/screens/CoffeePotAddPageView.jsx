import Input from '../../components/ui/Input'
import PageHeader from '../../components/ui/PageHeader'
import MainButtonType from '../../components/ui/MainButtonType'
import MainButtonLink from '../../components/ui/MainButtonLink'

const CoffeePotAddPageView = ({onSubmit, handleChange }) => {
    return (
            <div
            style={{
                padding:'3rem'
            }}>
                <PageHeader text='Добавление кофейни'/>
                <form method="POST" onSubmit={onSubmit}>
                    <Input 
                        name='name'
                        type='text' 
                        placeholder='Название кофейни' 
                        onChange={handleChange}
                        />
                    <Input 
                        name='address'
                        type='text' 
                        placeholder='Адрес кофейни' 
                        onChange={handleChange}
                        />
                    <MainButtonType buttonName='добавить' action='success' type='submit'/>
                    <MainButtonLink buttonName='Вернуться назад' action='confirm' href='/coffeePot'/>

                </form>
            </div>
    )
}

export default CoffeePotAddPageView