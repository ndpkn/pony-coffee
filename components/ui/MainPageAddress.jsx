import styles from '../../styles/MainPage.module.scss'
import pony from '../../images/pony_address.svg'
import Image from 'next/image'
import coffeeCup from '../../images/coffee_address.svg'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ellips from '../../images/Ellipse2.svg'
import { motion } from 'framer-motion'
import MotionBlock from './MotionBlock';


const MainPageAddress = () => {
    return (
        <div style={{position:'relative'}}>
            <div className={styles.main_address}>
                <div 
                    style={{
                        display:'flex',
                        flexDirection:'column', 
                        alignItems:'center', 
                        marginBottom:'6rem',
                        }}
                    >
                    <p className={styles.main_address_slogan}>
                        от работы дохнут кони <br /> <span className={styles.main_address_slogan_span1} >ну а я -</span> <br /><span style={{fontWeight:'600'}}>бессмертный</span><br /><span className={styles.main_address_slogan_span2}>пони</span>
                    </p>
                    <motion.div
                        initial={{
                            x: -200    
                        }}
                        whileInView={{
                            rotate: [12, 0, -12, 0, 12, 0, -12, 0, 12, 0, -12, 0], 
                            x: 0,
                            
                        }}
                        whileTap={{
                                rotate: [0,360 ]
                            }}
                        transition={{
                            // type: 'tween',
                            duration: 2
                        }}
                    >
                        <Image src={pony} alt='pony'/>
                    </motion.div>
                </div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className={styles.main_address_header}>
                        <p style={{fontWeight:'500', marginBottom:'1.5rem'}}>Мы ждем вас!</p>
                        <p style={{fontWeight:'300'}}>Работаем для вас ежедневно по адресу:</p>
                    </div>
                    <Image src={coffeeCup} alt='coffee cup'/>
                </div>
                <MotionBlock>
                    <div className={styles.main_address_maps}>
                        <div className={styles.main_address_maps_block}>
                            <Accordion >
                                <AccordionSummary
                                expandIcon={<ArrowDownwardIcon sx={{color: '#0080FF'}} fontSize="large" />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <p>Ворошиловский просп., 79</p>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        <div style={{position:'relative',overflow:'hidden'}}><a href="https://yandex.ru/maps/org/poni_kofe/53774152513/?utm_medium=mapframe&utm_source=maps" style={{color:'#eee', fontSize:'12px', position:'absolute', top:'0px'}}>Пони Кофе</a><a href="https://yandex.ru/maps/39/rostov-na-donu/category/coffee_to_go/178781223490/?utm_medium=mapframe&utm_source=maps" style={{color:'#eee', fontSize:'12px', position:'absolute', top:'14px'}}>Кофе с собой в Ростове‑на‑Дону</a><a href="https://yandex.ru/maps/39/rostov-na-donu/category/coffee_shop/35193114937/?utm_medium=mapframe&utm_source=maps" style={{color:'#eee', fontSize:'12px',position:'absolute', top:'28px'}}>Кофейня в Ростове‑на‑Дону</a><iframe src="https://yandex.ru/map-widget/v1/?ll=39.716217%2C47.227726&mode=search&oid=53774152513&ol=biz&z=13.94" width="100%" height="200"  allowFullScreen={true} style={{position:'relative', borderRadius: '1.5rem', border:'1px rgba(0, 128, 255, 0.25) solid'}}></iframe></div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ArrowDownwardIcon sx={{color: '#0080FF'}} fontSize="large"/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <p>Площадь Карла Маркса, 9</p>
                                </AccordionSummary>
                                <AccordionDetails>
                                <div>
                                    <div style={{position:'relative',overflow:'hidden'}}><a href="https://yandex.ru/maps/org/poni_kofe/4793831829/?utm_medium=mapframe&utm_source=maps" style={{color:'#eee', fontSize:'12px', position:'absolute', top:'0px'}}>Пони Кофе</a><a href="https://yandex.ru/maps/39/rostov-na-donu/category/coffee_to_go/178781223490/?utm_medium=mapframe&utm_source=maps" style={{color:'#eee', fontSize:'12px', position:'absolute', top:'14px'}}>Кофе с собой в Ростове‑на‑Дону</a><a href="https://yandex.ru/maps/39/rostov-na-donu/category/coffee_shop/35193114937/?utm_medium=mapframe&utm_source=maps" style={{color:'#eee', fontSize:'12px',position:'absolute', top:'28px'}}>Кофейня в Ростове‑на‑Дону</a><iframe src="https://yandex.ru/map-widget/v1/?ll=39.761891%2C47.231852&mode=search&oid=4793831829&ol=biz&z=13.94" width="100%" height="200"  allowFullScreen={true} style={{position:'relative', borderRadius: '1.5rem', border:'1px rgba(0, 128, 255, 0.25) solid'}}></iframe></div>
                                </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ArrowDownwardIcon sx={{color: '#0080FF'}} fontSize="large"/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <p>Аксай, Мега парк</p>
                                </AccordionSummary>
                                <AccordionDetails>
                                <div>
                                    <div style={{position:'relative',overflow:'hidden'}}><a href="https://yandex.ru/maps/org/poni_kofe_kofe_na_begu/60469606797/?utm_medium=mapframe&utm_source=maps" style={{color:'#eee', fontSize:'12px', position:'absolute', top:'0px'}}>Пони Кофе</a><a href="https://yandex.ru/maps/11031/aksay/category/coffee_to_go/178781223490/?utm_medium=mapframe&utm_source=maps" style={{color:'#eee', fontSize:'12px', position:'absolute', top:'14px'}}>Кофе с собой в Аксае</a><iframe src="https://yandex.ru/map-widget/v1/?ll=39.850583%2C47.290883&mode=search&oid=60469606797&ol=biz&z=17.93" width="100%" height="200"  allowFullScreen={true} style={{position:'relative', borderRadius: '1.5rem', border:'1px rgba(0, 128, 255, 0.25) solid'}}></iframe></div>
                                </div>
                                </AccordionDetails>
                            </Accordion>
                            </div>
                    </div>
                </MotionBlock>
            </div>
            <Image 
                className={styles.main_address_ellips}
                src={ellips} 
                alt='ellips' 
            />
        </div>
    )
}

export default MainPageAddress