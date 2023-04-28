import PageHeader from '../ui/PageHeader'
import styles from '../../styles/UserStatView.module.scss'
import Input from '../ui/Input'
import classNames from 'classnames'

const sortItems = [
    {label:'По имени', key:'byName'},
    {label:'Количество бонусов', key:'byQnt'},
    {label:'По ID', key:'byId'},
    {label:'Использованные бонусы', key:'byUsed'},
    {label:'Сгоревшие бонусы', key:'byBurnt'},
    {label:'Бонусы за неделю', key:'byWeek'},
    {label:'Бонус за месяц', key:'byMonth'},
    {label:'По телефону', key:'byPhone'},
]

const UserStatView = ({filteredUserInfo, error, loading, getSearchTerm, searchTerm, getKey, activeKey}) => {

    const items = 
        filteredUserInfo.length != 0 
        ?
        filteredUserInfo.map((item,i) => {
                return (
                        <tr key={i}>
                            <td style={{padding:'0.5rem'}}>{item.id}</td>
                            <td>{item.name == null ? 'Не указано' : item.name}</td>
                            <td>{item.phone  == null ? 'Не указан' : item.phone}</td>
                            <td>{item.active_bonuses_count}</td>
                            <td>{item.using_bonuses_count}</td>
                            <td>{item.burnt_bonuses_count}</td>
                            <td>{item.email  == '' ? 'Не указан' : item.email}</td>
                        </tr>
                        )
                    }) 
        :
        <tr>
            <td colSpan={7} style={{fontSize:'1.5rem', padding:'2rem'}}>Нет пользователей с таким номером</td>
        </tr>

    const errorMessage = 
        error 
        ?
        <tr>
            <td colSpan={7} style={{fontSize:'1.5rem', padding:'2rem'}}>
                Ошибка загрузки данных
            </td>
        </tr> 
        : 
        null

    const spinner = 
        loading 
        ? 
        <tr>
            <td colSpan={7} style={{fontSize:'1.5rem', padding:'2rem'}}>
                Загрузка ...
            </td>
        </tr> 
        : 
        null

    const content = 
        !(loading || error) ? 
        items : 
        null
    return (
        <div className={styles.userStat}>
            <PageHeader text='Статистика пользователя'/>
            <Input 
                name='phone'
                type='tel' 
                placeholder='Поиск по номеру' 
                onChange={getSearchTerm}
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
                                activeClass={item.key == activeKey ? classNames(styles.userStat_sortItem, styles.userStat_sortItem_active) : styles.userStat_sortItem}
                            />
                })}
            </div>
            <div className={styles.userStat_tableWrap}>
                <table className={styles.userStat_table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Телефон</th>
                            <th>Кол-во бонусов</th>
                            <th>Потрачено бонусов</th>
                            <th>Сгорело бонусов</th>
                            <th>Email</th>
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