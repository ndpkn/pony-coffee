import axios from "axios"

export const registerUser = async (phone, password, password_confirmation, name, agreement) => {    
    await axios
        .post('http://localhost:8000/api/register', {phone, password, password_confirmation, name, agreement} )
        .then(res => {
            console.log(res);
            // localStorage.setItem('token', res.data.token.accessToken)// засунуть в редакс
        })
        .catch((err) => {
            err.response.data.map((item) => {
                return console.log(item);
            });
            
        })
}