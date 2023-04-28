import { Alert } from '@mui/material'
import React from 'react'

const LoadedMessage = ({textSuccess}) => {
    const success = 
    textSuccess !== null
    ? 
    textSuccess?.map((item, i) => {
        return (
            <Alert 
            key={i}
                sx={{ 
                    fontSize: '1.5rem' 
                }} 
                severity="success">
                    {item}
            </Alert>)
    }) 
    :
    <Alert 
        sx={{ 
            fontSize: '1.5rem' 
        }} 
        severity="success">
            Успешно отправлено!
    </Alert>
    return (
        <div 
            style={{
                margin: '1rem auto',
                maxWidth: '35rem',
                width: '100%'
                }}
            >
            {success}
        </div>
    )
}

export default LoadedMessage