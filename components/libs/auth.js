import axios from "axios"

export const loginUser = async (phone, password) => {
    await axios
        .post('http://localhost:8000/api/login', {phone, password} )
        .then(res => {
            localStorage.setItem('token', res.data.data.accessToken)
            window.location.href = '/'
        })
        
        .catch((err) => {
            console.log(err.response.data.errors);
        })
}