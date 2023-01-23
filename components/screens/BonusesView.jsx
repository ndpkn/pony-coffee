import PageHeader from '../ui/PageHeader'
import styles from '../../styles/BonusesView.module.scss'
import Input from '../ui/Input'
import { useEffect, useState } from 'react'
import MainButtonType from '../ui/MainButtonType'
import axios from 'axios'

const BonusesView = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [bonus, setBonus] = useState(0)
    const [allUsers, setAllusers] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/search', {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                setAllusers(res.data.data.user)
                console.log(res.data.data.user);
            })
    }, [])

    const minusBonus = () => {
        setBonus((prevState) => prevState - 1)
    }
    const plusBonus = () => {
        setBonus((prevState) => prevState + 1)
    }
    const filteredUserInfo = allUsers.filter(item => {
        return item.phone.includes(searchTerm)
    })
    return (
        <div className={styles.bonuses}>
            <PageHeader text='Бонусы'/>
            <Input
                name='phone'
                type='tel' 
                placeholder='Введите номер' 
                onChange={(e) => setSearchTerm(e.target.value)}
                pattern="\+?[0-9\s\-\(\)]+"
                value={searchTerm}
            />
            <div className={styles.bonuses_table_wrap}>
                <table  className={styles.bonuses_table}>
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Телефон</th>
                            <th>Бонусы</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUserInfo.map((item) => {
                            return <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <div style={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
                                                <div>
                                                    <p>{bonus}</p>
                                                </div>
                                                <div style={{display:'flex'}}>
                                                    <button className={styles.bonuses_table_button_left} onClick={() => minusBonus()}>-</button>
                                                    <p className={styles.bonuses_table_button_count}>{item.bonuses.length == 0 ? 0 : item.bonuses.bonus}</p>
                                                    <button className={styles.bonuses_table_button_right} onClick={() => plusBonus()}>+</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <MainButtonType buttonName='Подтвердить' action='confirm' onClick={null}/>
        </div>

    )
}

export default BonusesView