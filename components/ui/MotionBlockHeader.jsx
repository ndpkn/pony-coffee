import { motion } from "framer-motion"
import styles from '../../styles/BlockHeader.module.scss'

const MotionBlockHeader = ({text, textSpan}) => {
    return (
        <motion.h2
            initial={{ 
                opacity: 0,
                x:'-100%'
            }}
            whileInView={{ 
                opacity: 1, 
                x: '0'
            }}
            transition={{ 
                duration: 0.5,
                delay: 0.5
            }}
            viewport={{ 
                once: true 
            }}

            className={styles.blockHeader}
        >
            <span 
                style={{
                    color:'#0082FF'
                }}>
                {textSpan}
            </span>
            {text}
        </motion.h2>
    )
}

export default MotionBlockHeader