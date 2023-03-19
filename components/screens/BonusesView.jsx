import PageHeader from '../ui/PageHeader'
import styles from '../../styles/BonusesView.module.scss'
import Input from '../ui/Input'
import { useState } from 'react'
import MainButtonType from '../ui/MainButtonType'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'

const BonusesView = ({error, loading, allUsers}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [bonusCount, setBonusCount] = useState(0)
    const [id, setId] = useState(0)


    const filteredUsers = allUsers.filter(item => {
        return item.phone.includes(searchTerm)
    })

    const addBonuses = (id) => {
        setBonusCount((prevState) => prevState + 1)
        setId(id)
        // console.log('+', bonus, id);
    }
    const removeBonuses = (id) => {
        setBonusCount((prevState) => prevState - 1)
        setId(id)
        // console.log('-', bonus, id);
    }


    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? <Table filteredUsers={filteredUsers} bonusCount={bonusCount} addBonuses={addBonuses} removeBonuses={removeBonuses} setBonusCount={setBonusCount}/> : null

    const sendBonuses = (bonus, id) => {
        bonus > 0 ?
        console.log('+', bonus, id):
        console.log('-', bonus, id)
    }

    const showBonusesCount = (count) => {
        console.log(count);
    }

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
            <MainButtonType buttonName='Подтвердить' action='confirm' onClick={() => sendBonuses(bonusCount, id)}/>
        </div>
    )
}

const Table = ({filteredUsers, bonusCount, setBonusCount, addBonuses, removeBonuses}) => {
    return (
    <div className={styles.bonuses_table_wrap}>
        <table  className={styles.bonuses_table}>
            <thead>
                <tr>
                    <th>ID</th>
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
                                number={item.id}
                                key={item.id} 
                                id={item.id} 
                                phone ={item.phone} 
                                name={item.name} 
                                bonuses={item.active_bonuses_count}
                                bonusCount={bonusCount}
                                setBonusCount={setBonusCount}
                                addBonuses={addBonuses} 
                                removeBonuses={removeBonuses}
                                />
                })}
            </tbody>
        </table>
    </div>
    )
}


const BonusesUser = ({id, phone, name, bonuses, bonusCount, setBonusCount, addBonuses, removeBonuses }) => {

    return (
        <tr key={id}>
            <td style={{padding:'0.1rem'}}>{id}</td>
            <td>{name}</td>
            <td>{phone}</td>
            <td>
                <div 
                    style={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
                    <div>
                        <p>{bonusCount}</p>
                    </div>
                    <div 
                        style={{display:'flex'}}>
                        <button 
                            className={styles.bonuses_table_button_left} 
                            onClick={() => removeBonuses(id)}>
                                -
                        </button>
                        <p 
                            className={styles.bonuses_table_button_count}>
                            {bonuses == 0 ? 0 : bonuses}
                        </p>
                        <button 
                            className={styles.bonuses_table_button_right} 
                            onClick={() => addBonuses(id)}>
                                +
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    )
}


export default BonusesView