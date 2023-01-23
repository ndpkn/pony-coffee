import Layout from '../../Layout'
import PageHeader from '../../ui/PageHeader'

const App = () => {
    return (
        <Layout title="Главная страница">
            <div className="home">
                <PageHeader text='Главная'/>
            </div>
        </Layout>
    )
}

export default App