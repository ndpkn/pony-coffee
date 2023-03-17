import { motion } from 'framer-motion'

const MotionBlock = ({children}) => {
    return (
        <motion.div
            initial={{ 
                opacity: 0, 
                scale: 0.5 
            
            }}
            whileInView={{ 
                opacity: 1, 
                scale: 1 
            }}
            transition={{ 
                duration: 0.5,
                delay: 0.5
            }}
            viewport={{ 
                once: true 
            }}>
                {children}
        </motion.div>
    )
}

export default MotionBlock