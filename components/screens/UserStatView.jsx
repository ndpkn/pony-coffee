import React, { useEffect, useState } from 'react'
import PageHeader from '../ui/PageHeader'
import styles from '../../styles/UserStatView.module.scss'
import Input from '../ui/Input'
import classNames from 'classnames'
import axios from 'axios'
import PonyService from '../../services/PonyServices'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'

const sortItems = [
    {label:'По имени', key:'byName'},
    {label:'Количество бонусов', key:'byQnt'},
    {label:'Использованные бонусы', key:'byUsed'},
    {label:'Сгоревшие бонусы', key:'byBurnt'},
    {label:'Бонусы за неделю', key:'byWeek'},
    {label:'Бонус за месяц', key:'byMonth'},
    {label:'По телефону', key:'byPhone'},
]

const UserStatView = () => {
    const [activeKey, setActiveKey] = useState('')
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const [userInfo, setUserInfo] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    function SortByName(x,y){
        return x.name.localeCompare(y.name)
    }
    function SortByPhone(x,y){
        return x.phone.localeCompare(y.phone)
    }
    function SortByBonuses(x,y){
        return y.active_bonuses_count - x.active_bonuses_count
        // return x.active_bonuses_count.localeCompare(y.active_bonuses_count)
    }
    function SortByBurnt(x,y){
        return y.burnt_bonuses_count - x.burnt_bonuses_count
    }
    function SortByUsing(x,y){
        return y.using_bonuses_count - x.using_bonuses_count
    }
    function SortByCreate(x,y){
        return x.created_at.localeCompare(y.created_at)
    }

    const ponyService = new PonyService()

    // получение списка пользователей
    useEffect(() => {
        ponyService.getUserStat()
                        .then(onUserInfoLoaded)
                        .catch(onError)
    }, [])

    //данные загружены успешно
    const onUserInfoLoaded = (userInfoList) => {
        setUserInfo(userInfoList)
        setData(userInfoList)
        setLoading(false)
    }

    //при загрузке произошла ошибка
    const onError = (err) => {
        console.log(err);
        setError(true)
        setLoading(false)
    }

    //изменение массива при клике
    useEffect(() => {
        let newArr
        switch (activeKey) {
            case 'byName':
                newArr = [...userInfo.sort(SortByName)]
                setUserInfo(newArr)
                console.log(newArr);
                break;
            case 'byPhone':
                newArr = [...userInfo.sort(SortByPhone)]
                setUserInfo(newArr)
                break;
            case 'byQnt':
                newArr = [...userInfo.sort(SortByBonuses)]
                setUserInfo(newArr)
                break;
            case 'byUsed':
                newArr = [...userInfo.sort(SortByUsing)]
                setUserInfo(newArr)
                break;
            case 'byBurnt':
                newArr = [...userInfo.sort(SortByBurnt)]
                setUserInfo(newArr)
                break;
            case 'all':
                newArr = [...userInfo.sort(SortByPhone)]
                setUserInfo(newArr)
                break;
            default: 
                setUserInfo(data)
        }
    }, [activeKey])

    //фильтрация списка по номеру телефона
    const filteredUserInfo = userInfo.filter(item => {
        return item.phone.includes(searchTerm)
    })

    //получение значения по клику
    const getKey = (key) => {
        setActiveKey(activeKey === key ? 'all' : key)
        // console.log(activeKey);
    }

    const items = filteredUserInfo.map((item,i) => {
            return <tr key={i}>
                        <td style={{padding:'0.5rem'}}>{i + 1}</td>
                        <td>{item.name == null ? 'Не указано' : item.name}</td>
                        <td>{item.phone  == null ? 'Не указан' : item.phone}</td>
                        <td>{item.active_bonuses_count}</td>
                        <td>{item.email  == '' ? 'Не указан' : item.email}</td>
                        <td>{item.using_bonuses_count}</td>
                        <td>{item.burnt_bonuses_count}</td>
                    </tr>
                    })
    // {filteredUserInfo.length == 0 ? 
    //     <td colspan={6} style={{fontSize:'1.5rem', padding:'2rem'}}>Нет пользователей с таким номером</td> :
    // }
    const errorMessage = error ? <tr><td colSpan={7} style={{fontSize:'1.5rem', padding:'2rem'}}>Ошибка загрузки данных</td></tr> : null;
    const spinner = loading ? <tr><td colSpan={7} style={{fontSize:'1.5rem', padding:'2rem'}}>Загрузка ...</td></tr> : null;
    const content = !(loading || error) ? items : null;
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
                            <th>№</th>
                            <th>Имя</th>
                            <th>Телефон</th>
                            <th>Кол-во бонусов</th>
                            <th>email</th>
                            <th>Потрачено бонусов</th>
                            <th>Сгорело бонусов</th>
                        </tr>
                    </thead>
                    <tbody>

                        {errorMessage}
                        {spinner}
                        {content}

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