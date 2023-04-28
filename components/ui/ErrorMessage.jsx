import { Alert } from "@mui/material"

const ErrorMessage = ({textError}) => {
    const errors = 
    textError !== null
    ? 
    textError?.map((item, i) => {
        return (
            <Alert 
                key={i} 
                sx={{ fontSize: '1.5rem', 
                        borderRadius:'1rem', 
                        marginBottom:'1rem' 
                    }} 
                severity="error">
                    {item}
            </Alert>)
    }) 
    :
    <Alert 
        sx={{ 
            fontSize: '1.5rem', 
            borderRadius:'1rem', 
            marginBottom:'1rem' 
            }} 
            severity="error">
                Произошла ошибка!
    </Alert>


    return (
        <div style={{marginBottom:'1rem', marginTop:'1rem', maxWidth:'35rem', width: '100%', margin: '0 auto'}}>
            {errors}
        </div>
    )
}

export default ErrorMessage