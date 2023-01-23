import React, { useEffect, useState } from 'react'
import PageHeader from '../ui/PageHeader'
import styles from '../../styles/UserStatView.module.scss'
import Input from '../ui/Input'
import classNames from 'classnames'
import axios from 'axios'

const sortItems = [
    {label:'По имени', key:'byName'},
    {label:'Количество бонусов', key:'byQnt'},
    {label:'Использованные бонусы', key:'byUsed'},
    {label:'Сгоревшие бонусы', key:'byBurnt'},
    {label:'Бонусы за неделю', key:'byWeek'},
    {label:'Бонус за месяц', key:'byPhone'},
]

const UserStatView = () => {
    const [activeKey, setActiveKey] = useState('')
    const [data, setData] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    function SortByName(x,y){
        return x.name.localeCompare(y.name)
    }
    function SortByPhone(x,y){
        return x.phone.localeCompare(y.phone)
    }


    // получение списка пользователей
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/statistic/users', {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                setData(res.data.data.user)
                setUserInfo(res.data.data.user)
            })
    }, [])
    //изменение массива при клике
    useEffect(() => {
        let newArr
        switch (activeKey) {
            case 'byName':
                newArr = [...userInfo.sort(SortByName)]
                setUserInfo(newArr)
                console.log(newArr, activeKey);
                break;
            case 'byPhone':
                newArr = [...userInfo.sort(SortByPhone)]
                setUserInfo(newArr)
                console.log(newArr, activeKey);
                break;
            case 'all':
                // console.log(data);
                newArr = [...data]
                setUserInfo(newArr)
                console.log(data, activeKey);
                break;
            default: 
            setUserInfo(userInfo)
        }
    }, [activeKey])

    const filteredUserInfo = userInfo.filter(item => {
        return item.phone.includes(searchTerm)
    })

    //получение значения по клику
    const getKey = (key) => {
        setActiveKey(activeKey === key ? 'all' : key)
        // console.log(activeKey);
    }
    return (
        <div className={styles.userStat}>
            <PageHeader text='Статистика пользователя'/>
            <Input 
                name='phone'
                type='tel' 
                placeholder='Поиск по номеру' 
                onChange={(e) => setSearchTerm(e.target.value)}
                pattern="\+?[0-9\s\-\(\)]+"
                value={searchTerm}
                />
            <h2 className={styles.userStat_h2}> Сортировать по:</h2>
            <div className={styles.userStat_sort}>
                {sortItems.map((item) => {
                    return <SortItem 
                                key={item.key} 
                                name={item.label} 
                                onClick={() => getKey(item.key)}
                                activeClass={item.key === activeKey ? classNames(styles.userStat_sortItem, styles.userStat_sortItem_active) : styles.userStat_sortItem}
                            />
                })}
            </div>
            <div className={styles.userStat_tableWrap}>
                <table className={styles.userStat_table}>
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Телефон</th>
                            <th>Кол-во бонусов</th>
                            <th>email</th>
                            <th>Кол-во бонусов</th>
                            <th>Потрачено бонусов</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUserInfo.length == 0 
                        ? 
                            <tr>
                                <td colSpan={6} style={{fontSize:'1.5rem', padding:'2rem'}}>Нет пользователей с таким номером</td>
                            </tr> 
                        :
                        filteredUserInfo.map((item,i) => {
                            return <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        {/* <td>{item.bonuses.bonus}</td> */}
                                        <td>Контент 1</td>
                                        <td>Контент 2</td>
                                    </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

const SortItem = ({name, onClick, activeClass}) => {
    return (
        <button className={activeClass} onClick={onClick}>{name}</button>
    )
}

export default UserStatView