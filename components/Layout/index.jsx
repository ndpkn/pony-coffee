import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Meta from '../../app/utils/Meta'
import PonyService from '../../services/PonyServices'
import Header from '../ui/Header'
import { useDispatch } from "react-redux";

import { setHeaderMenu, setHeaderMenuLoading, setHeaderMenuError } from '../../store/headerMenuSlice'

const Layout = ({children, title, descr}) => {
  const router = useRouter()

  const dispatch = useDispatch()
  
  const ponyService = new PonyService()

  useEffect(() => {
      ponyService.getHeader()
                      .then(onHeaderLoaded)
                      .catch(onError)
      },[])
  //данные загружены успешно
  const onHeaderLoaded = (headerList) => {
      // setHeader(headerList)
      dispatch(setHeaderMenu(headerList))
      dispatch(setHeaderMenuLoading(false))
  }

  //при загрузке произошла ошибка
  const onError = () => {
  dispatch(setHeaderMenuLoading(false))
  dispatch(setHeaderMenuError(true))
  }

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