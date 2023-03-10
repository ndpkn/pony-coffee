import { Box, CircularProgress } from "@mui/material"
import Image from "next/image"
import pony from '../../images/ponyanim.gif'

const LoadingMessage = () => {
    return (
        // <Box sx={{ display: 'flex' }} style={{marginBottom:'2rem', marginTop:'2rem', justifyContent:'center'}}>
        //     <CircularProgress />
        // </Box>
        <div 
            style={{
                width:'100%',
                display:'flex',
                justifyContent:'center',
                padding:'2rem'
        }}>
            <Image src={pony} alt='pony' width={50}/>
        </div>
    )
    }

export default LoadingMessage