import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Meta from '../../app/utils/Meta'
import Header from '../ui/Header'

const Layout = ({children, title, descr}) => {
  const router = useRouter()

  return (
    <div className='layout'>
      <Meta title={title} description={descr}/>
      <Header/>
      <AnimatePresence mode='wait'>
        <motion.div
          key={router.route}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{
            duration: 0.5,
          }}
          variants={{
            initialState: {
              opacity: 0,
              // clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)',
            },
            animateState: {
              opacity: 1,
              // clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)',
            },
            exitState: {
              opacity: 1
              // clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
            },
          }}>
          <main>{children}</main>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}




export default Layout