import { useEffect } from "react"
import PonyService from "../services/PonyServices"

const Logout = () => {

    const ponyService = new PonyService()

    useEffect(() => {
        ponyService.logout()
            .then(onLogout)
            .catch(onError)
    }, [])

    const onLogout = (res) => {
        console.log(res)
        localStorage.removeItem('token')    
        window.location.href = '/'
    }
    const onError = err => {
        // console.error(`Ошибка: ${err}`)
    }
}

export default Logout