import { Box, CircularProgress } from "@mui/material"

const LoadingMessage = () => {
    return (
        <Box sx={{ display: 'flex' }} style={{marginBottom:'2rem', marginTop:'2rem', justifyContent:'center'}}>
            <CircularProgress />
        </Box>
    )
    }

export default LoadingMessage