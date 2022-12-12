import Link from 'next/link'
import Meta from '../../app/utils/Meta'

const Layout = ({children, title} ) => {
  return (
    <>
    <Meta title={title} description="Описание страницы"/>
    <header>
        <Link href="/">home</Link>
        <br />
        <Link href="/addUser">add user</Link>
    </header>
    <div>{children}</div>
    </>
  )
}

export default Layout