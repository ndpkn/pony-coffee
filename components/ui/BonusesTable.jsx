import BonusesUser from "./BonusesUser"
import MainButtonType from "./MainButtonType"
import styles from '../../styles/BonusesView.module.scss'


const BonusesTable = ({filteredUsers, bonusCount, setBonusCount, addBonuses, removeBonuses, handleOpenDialogAdd, handleOpenDialogRemove}) => {
    return (
    <>
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
                                handleOpenDialogAdd={handleOpenDialogAdd}
                                handleOpenDialogRemove={handleOpenDialogRemove}
                                />
                })}
            </tbody>
        </table>
    </div>

    </>
    )
}
export default BonusesTable