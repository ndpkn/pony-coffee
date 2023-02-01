class PonyService {
    _apiBase = 'http://localhost:8000/api'
    
// GET
    getData = async (url) => {
        let res = await fetch(url, {
                            method: 'GET',
                            headers: {
                                accept: 'application/json',
                                authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`, console.log(res));
        }
    
        return await res.json();
        
    }

    getBarista = async () => {
        const res = await this.getData(`${this._apiBase}/barista`);
        return res.data.users
    }
    getBaristaPage = async (id) => {
        const res = await this.getData(`${this._apiBase}/barista/${id}`)
        console.log(id);
        return res.data
    }

    getCoffeePot = async () => {
        const res = await this.getData(`${this._apiBase}/coffeePot`);
        return res.data.coffeePots
    }
    getUserStat = async () => {
        const res = await this.getData(`${this._apiBase}/statistic/users`);
        return res.data.user
    }
    getHeader = async () => {
        const res = await this.getData(`${this._apiBase}/header`);
        return res.data.header
    }
    getFeedbackHistory = async () => {
        const res = await this.getData(`${this._apiBase}/feedback`);
        return res.data.feedbacks
    }
    getProfile = async () => {
        const res = await this.getData(`${this._apiBase}/profile`);
        return res.data.user
    }
    getBonuses = async () => {
        const res = await this.getData(`${this._apiBase}/users`);
        return res.data.users
    }
    

//POST

//PUT

//DELETE
}

export default PonyService

