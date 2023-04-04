import { Alert } from '@mui/material'
import React from 'react'

const LoadedMessage = () => {
    return (
        <div 
            style={{
                margin: '1rem auto',
                maxWidth: '35rem',
                

                }}
            >
            <Alert sx={{ fontSize: '1.5rem' }} severity="success">Успешно отправлено!</Alert>
        </div>
    )
}

export default LoadedMessage