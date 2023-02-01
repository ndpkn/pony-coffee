import PageHeader from '../ui/PageHeader'
import styles from '../../styles/BonusesView.module.scss'
import Input from '../ui/Input'
import { useEffect, useState } from 'react'
import MainButtonType from '../ui/MainButtonType'
import PonyService from '../../services/PonyServices'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'

const BonusesView = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [allUsers, setAllusers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const ponyService = new PonyService()

    // получение данных
    useEffect(() => {
        ponyService.getBonuses()
                        .then(onBonusesLoaded)
                        .catch(onError)
        },[])

    //данные загружены успешно
    const onBonusesLoaded = (bonusesList) => {
        setAllusers(bonusesList)
        setLoading(false)
    }

    //при загрузке произошла ошибка
    const onError = (err) => {
        setError(true)
        setLoading(false)
        console.log(err);
    }
    const filteredUsers = allUsers.filter(item => {
        return item.phone.includes(searchTerm)
    })

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? <Table filteredUsers={filteredUsers}/> : null

    return (
        <div className={styles.bonuses}>
            <PageHeader text='Бонусы'/>
            <Input
                name='phone'
                type='tel' 
                placeholder='Начните вводить номер' 
                onChange={(e) => setSearchTerm(e.target.value)}
                pattern="\+?[0-9\s\-\(\)]+"
                value={searchTerm}
            />
                {errorMessage}
                {spinner}
                {searchTerm != '' ? content : null}
            <MainButtonType buttonName='Подтвердить' action='confirm' onClick={null}/>
        </div>
    )
}

const Table = ({filteredUsers}) => {
    return (
    <div className={styles.bonuses_table_wrap}>
        <table  className={styles.bonuses_table}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Имя</th>
                    <th>Телефон</th>
                    <th>Бонусы</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.length == 0 
                ?   <tr>
                        <td colSpan={6}>
                            Нет пользователя с таким номером
                        </td>
                    </tr>
                : filteredUsers.map((item, i) => {
                    return <BonusesUser 
                                number={i + 1}
                                key={item.id} 
                                id={item.id} 
                                phone ={item.phone} 
                                name={item.name} 
                                bonuses={item.active_bonuses_count}/>
                })}
            </tbody>
        </table>
    </div>
    )
}


const BonusesUser = ({id, phone, name, bonuses, number}) => {
    const [bonus, setBonus] = useState(0)

    return (
        <tr key={id}>
            <td style={{padding:'0.1rem'}}>{number}</td>
            <td>{name}</td>
            <td>{phone}</td>
            <td>
                <div 
                    style={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
                    <div>
                        <p>{bonus}</p>
                    </div>
                    <div 
                        style={{display:'flex'}}>
                        <button 
                            className={styles.bonuses_table_button_left} 
                            onClick={() => setBonus((prevState) => prevState - 1)}>
                                -
                        </button>
                        <p 
                            className={styles.bonuses_table_button_count}>
                            {bonuses == 0 ? 0 : bonuses}
                        </p>
                        <button 
                            className={styles.bonuses_table_button_right} 
                            onClick={() => setBonus((prevState) => prevState + 1)}>
                                +
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    )
}


export default BonusesView