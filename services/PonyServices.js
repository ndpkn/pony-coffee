import axios from "axios";

class PonyService {
    _apiBase = 'http://localhost:8080/api';

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

                if (res.status < 200 || res.status >= 300) {
                    throw new Error(`Could not fetch ${url}, status: ${res.status}`, console.error(res));
                } 
                return res;
        
    }

    getBarista = async () => {
        const res = await this.getData(`${this._apiBase}/barista`);
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
    getBonusConfig = async () => {
        const res = await this.getData(`${this._apiBase}/bonus/config`);
        return res.data.data
    }
    getAdminNotifications = async () => {
        const res = await this.getData(`${this._apiBase}/admin/notification`);
        return res.data.data.notifications
    }
    getFeedbacksAdmin = async () => {
        const res = await this.getData(`${this._apiBase}/admin/feedbacks`);
        return res.data.data.feedbacks
    }
    getAdminFeedbackById = async (id) => {
        const res = await this.getData(`${this._apiBase}/admin/feedback/${id}`);
        return res.data.data.feedback
    }
    getFeedbackById = async (id) => {
        const res = await this.getData(`${this._apiBase}/feedback/${id}`);
        return res.data.data.feedback
    }
    getChannels = async () => {
        const res = await this.getData(`${this._apiBase}/channels`);
        return res.data.data.channels
    }
    getNotifications = async () => {
        const res = await this.getData(`${this._apiBase}/notification`);
        return res.data.data.notifications
    }
    getNotificationCount = async () => {
        const res = await this.getData(`${this._apiBase}/notification/count`);
        return res.data.data.count
    }
    

//POST

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
    if (res.status < 200 || res.status >= 300) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`, console.error(res));
    }
    return res;
}


addNotification = async (data) => {
    const res = await this.postData(`${this._apiBase}/admin/notification`, data);
    return res
}
// sendMessage = async (data, id) => {
//     const res = await this.postData(`${this._apiBase}/feedback/${id}`, );
//     return res
// }
logout = async () => {
    const res = await this.postData(`${this._apiBase}/logout`);
    return res
}

login = async (data) => {
    const res = await this.postData(`${this._apiBase}/login`, data)
    return res
}
register = async (data) => {
    const res = await this.postData(`${this._apiBase}/register`, data)
    return res
}
getCode = async (data) => {
    const res = await this.postData(`${this._apiBase}/call`, data)
    return res
}
addBarista = async (data) => {
    const res = await this.postData(`${this._apiBase}/barista`, data)
    return res
}
addCoffeePot = async (data) => {
    const res = await this.postData(`${this._apiBase}/admin/coffeePot`, data)
    return res
}
addFeedback = async (data) => {
    const res = await this.postData(`${this._apiBase}/feedback`, data)
    return res
}
addMessageAdmin = async (data, id) => {
    const res = await this.postData(`${this._apiBase}/admin/feedback/${id}`, data)
    return res
}
addMessageUser = async (data, id) => {
    const res = await this.postData(`${this._apiBase}/feedback/${id}`, data)
    return res
}
addBonus = async (data, id) => {
    const res = await this.postData(`${this._apiBase}/bonus/${id}`, data)
    return res
}


//PUT
putData = async (url, data) => {
    let res = await axios
                        .put(
                            url,
                            data,
                            { 
                                headers: {
                                    accept: 'application/json',
                                    authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            })
    if (res.status < 200 || res.status >= 300) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`, console.error(res));
    }
    return res;
}

changeBarista = async (data, id) => {
    const res = await this.putData(`${this._apiBase}/barista/${id}`, data);
    return res
}
changeCoffeePot = async (data, id) => {
    const res = await this.putData(`${this._apiBase}/admin/coffeePot/${id}`, data);
    return res
}
changeEmail = async (data) => {
    const res = await this.putData(`${this._apiBase}/profile/email`, data);
    return res
}
changeName = async (data) => {
    const res = await this.putData(`${this._apiBase}/profile/name`, data);
    return res
}
changePass = async (data) => {
    const res = await this.putData(`${this._apiBase}/profile/password`, data);
    return res
}
changePhone = async (data) => {
    const res = await this.putData(`${this._apiBase}/profile/phone`, data);
    return res
}
putBonus = async (data, id) => {
    const res = await this.putData(`${this._apiBase}/bonus/${id}`, data);
    return res
}
readNotification = async (id) => {
    const res = await this.putData(`${this._apiBase}/notification/${id}`);
    return res
}


//DELETE

deleteData = async (url) => {
    let res = await axios
                        .delete(
                            url,
                            
                            { 
                                headers: {
                                    accept: 'application/json',
                                    authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            })
    if (res.status < 200 || res.status >= 300) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`, console.error(res));
    }
    return res;
}

deleteBarista = async (id) => {
    const res = await this.deleteData(`${this._apiBase}/barista/${id}`);
    return res
}
deleteCoffeePot = async (id) => {
    const res = await this.deleteData(`${this._apiBase}/admin/coffeePot/${id}`);
    return res
}

}

export default PonyService

