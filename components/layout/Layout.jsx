import Meta from '../../app/utils/Meta'
import GetHeader from '../ui/headers/GetHeader'

const Layout = ({children, title}, role) => {
  
  return (
    <>
    <Meta title={title} description="Описание страницы"/>
    <GetHeader/>
    <div>{children}</div>
    </>
  )
}




export default Layout