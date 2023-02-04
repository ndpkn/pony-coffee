import axios from "axios";

class PonyService {
    _apiBase = 'http://localhost:8000/api'
    
// GET
    getData = async (url) => {
        let res = await axios
                            .get(
                                url,
                                { 
                                    headers: 
                                        {
                                        accept: 'application/json',
                                        authorization: `Bearer ${localStorage.getItem('token')}`
                                        }
                                })

                if (res.status !== 200) {
                    throw new Error(`Could not fetch ${url}, status: ${res.status}`, console.error(res));
                }
                return res;
        
    }
    // getData = async (url) => {
    //     let res = await fetch(url, {
    //                         method: 'GET',
    //                         headers: {
    //                             accept: 'application/json',
    //                             authorization: `Bearer ${localStorage.getItem('token')}`
    //                         }
    //                     });

    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`, console.error(res));
    //     }
    
    //     return await res.json();
        
    // }

    getBarista = async () => {
        const res = await this.getData(`${this._apiBase}/barista`);
        console.log(res);
        return res.data.data.users
    }
    getBaristaPage = async (id) => {
        const res = await this.getData(`${this._apiBase}/barista/${id}`)
        return res.data.data
    }

    getCoffeePot = async () => {
        const res = await this.getData(`${this._apiBase}/coffeePot`);
        return res.data.data.coffeePots
    }
    getCoffeePotPage = async (id) => {
        const res = await this.getData(`${this._apiBase}/admin/coffeePot/${id}`);
        return res.data.data.coffeePot
    }

    getUserStat = async () => {
        const res = await this.getData(`${this._apiBase}/statistic/users`);
        return res.data.data.user
    }
    getHeader = async () => {
        const res = await this.getData(`${this._apiBase}/header`);
        return res.data.data.header
    }
    getFeedbackHistory = async () => {
        const res = await this.getData(`${this._apiBase}/feedback`);
        return res.data.data.feedbacks
    }
    getProfile = async () => {
        const res = await this.getData(`${this._apiBase}/profile`);
        return res.data.data.user
    }
    getBonuses = async () => {
        const res = await this.getData(`${this._apiBase}/users`);
        return res.data.data.users
    }
    getBonusesByUser = async () => {
        const res = await this.getData(`${this._apiBase}/user/bonuses`);
        return res.data.data
    }
    getNotifications = async () => {
        const res = await this.getData(`${this._apiBase}/admin/notification`);
        return res.data.data.notifications
    }
    

//POST
// postData = async (url, data) => {
//     // console.log(url, data)
//     let res = await fetch(url, {
//                         method: 'POST',
//                         headers: {
//                             Accept: 'application/json',
//                             Authorization: `Bearer ${localStorage.getItem('token')}`
//                         }, 
//                         body: JSON.stringify(data)
//                     })
//                     // .then((response) => response.json())
//                     // .then((data) => console.log(data))
//                     .catch((err) => console.error(err))
//                     ;

//     if (!res.ok) {
//         throw new Error(`Could not fetch ${url}, status: ${res.status}`, console.error(res));
//     }
//     return await res.json();
    
// }

postData = async (url, data) => {
    let res = await axios
                        .post(
                            url,
                            data,
                            { 
                                headers: {
                                accept: 'application/json',
                                authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            })
    // if (res) {
    //     console.log(res);
    // }
    if (res.status !== 200) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`, console.error(res));
    }
    return res;
}


addNotification = async (data) => {
    const res = await this.postData(`${this._apiBase}/admin/notification`, data);
    return res
}
//PUT

//DELETE
}

export default PonyService

