import { Alert } from "@mui/material"

const ErrorMessage = ({textError}) => {
    console.log(textError)
    const errors = 
    textError
    ? 
    textError.map((item, i) => {
        return <Alert key={i} sx={{ fontSize: '1.5rem', borderRadius:'1rem', marginBottom:'1rem' }} severity="error">{item}</Alert>
    }) 
    :
    null
    return (
        <div style={{marginBottom:'1rem', marginTop:'1rem'}}>
            <Alert sx={{ fontSize: '1.5rem', borderRadius:'1rem', marginBottom:'1rem' }} severity="error">Произошла ошибка!</Alert>
            {errors}
        </div>
    )
}

export default ErrorMessage