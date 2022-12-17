import { useEffect } from 'react'
import axios from "axios"


const LogoutComp = () => {
    return (
        useEffect(() => {
            axios
            .post('http://localhost:8000/api/logout', {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(
                localStorage.removeItem('token')
                )
            .then(
                window.location.href = '/'
            )
        }, [])
    )
}

export default LogoutComp