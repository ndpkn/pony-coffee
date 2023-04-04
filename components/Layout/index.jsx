import Meta from '../../app/utils/Meta'
import Header from '../ui/Header'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PonyService from '../../services/PonyServices'
import { useDispatch } from "react-redux";

import { setHeaderMenu, setHeaderMenuLoading, setHeaderMenuError, setNotifCounter } from '../../store/headerMenuSlice'

const Layout = ({children, title, descr, maxWidth}) => {
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
      headerList.map(item => {
        item.href == '/notifications' 
        ? 
        ponyService.getNotificationCount()
          .then(onCountLoaded)
          .catch(onCountError) 
        :
        null
      })
      // setHeader(headerList)
      dispatch(setHeaderMenu(headerList))
      dispatch(setHeaderMenuLoading(false))
  }
  //при загрузке произошла ошибка
  const onError = () => {
      dispatch(setHeaderMenuLoading(false))
      dispatch(setHeaderMenuError(true))
  }

  const onCountLoaded = (count) => {
    dispatch(setNotifCounter(count))
  }
  const onCountError = (err) => {
      console.log(err);
  }

  return (
    <div className='layout'>
      <Meta title={title} description={descr}/>
        <Header/>
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
            },
            animateState: {
              opacity: 1,
            },
            exitState: {
              opacity: 0
            },
          }}>
          <main
            style={{
              maxWidth: maxWidth ? null : '100rem'
            }}
          >
            {children}
          </main>
        </motion.div>
    </div>
  )
}




export default Layout