// import styles from '../../styles/BonusesView.module.scss'

import { Button } from "@mui/material"
import MainButtonType from "./MainButtonType"

const BonusesUser = ({id, phone, name, bonuses, bonusCount, setBonusCount, addBonuses, removeBonuses, handleOpenDialogAdd, handleOpenDialogRemove}) => {

    return (
        <>
            <tr key={id}>
                <td style={{padding:'0.1rem'}}>{id}</td>
                <td>{name}</td>
                <td>{phone}</td>
                <td>
                    <div 
                        style={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
                        <div>
                            <p>{bonuses}</p>
                        </div>
                        <div 
                            style={{display:'flex'}}>
                            {/* <button 
                                className={styles.bonuses_table_button_left} 
                                onClick={() => removeBonuses(id)}>
                                    -
                            </button> */}
                            {/* <p 
                                className={styles.bonuses_table_button_count}>
                                {bonuses == 0 ? 0 : bonuses}
                            </p> */}
                            {/* <button 
                                className={styles.bonuses_table_button_right} 
                                onClick={() => addBonuses(id)}>
                                    +
                            </button> */}
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <Button 
                        style={{fontFamily: 'Montserrat, sans-serif', fontSize:'1.4rem'}}
                        onClick={() => handleOpenDialogAdd(id)}
                        >
                        добавить
                    </Button>
                    {/* <MainButtonType buttonName='Добавить' action='success' onClick={() => handleOpenDialogAdd(id)}/> */}
                </td>
                <td colSpan={2}>
                    <Button 
                        style={{fontFamily: 'Montserrat, sans-serif', fontSize:'1.4rem', color:'#FFA700'}}
                        onClick={() => handleOpenDialogRemove(id)}
                        >
                        списать
                    </Button>
                    {/* <MainButtonType buttonName='списать' action='confirm'  onClick={() => handleOpenDialogRemove(id)}/> */}
                </td>
            </tr>
        </>
    )
}

export default BonusesUser