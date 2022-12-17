import Meta from '../../app/utils/Meta'
import Header from '../ui/Header'

const Layout = ({children, title}) => {
  
  return (
    <>
      <Meta title={title} description="Описание страницы"/>
      <Header/>
      <main>{children}</main>
    </>
  )
}




export default Layout