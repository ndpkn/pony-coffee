import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'


const BonusesRemoveDialog = ({openDialog, handleCloseDialog, bonusCount, removeBonuses, addBonuses, id, sendBonuses, writeOff}) => {
    function getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100
        if (n >= 5 && n <= 20) {
            return five
        }
        n %= 10;
        if (n === 1) {
            return one
        }
        if (n >= 2 && n <= 4) {
            return two
        }
        return five
        }
    
    return (
        <Dialog 
            open={openDialog} 
            onClose={handleCloseDialog}
        >
        <DialogTitle 
            style={{fontFamily: 'Montserrat', fontSize:'1.6rem'}}
        >
            Списание бонусов
        </DialogTitle>
        <DialogContent>
            <DialogContentText 
                style={{fontFamily: 'Montserrat, sans-serif', fontSize:'1.5rem'}}
            >
                Введите количество чашек кофе для списания
            </DialogContentText>
            <p
                style={{fontFamily: 'Montserrat, sans-serif', fontSize:'1.1rem'}}
            >
                {`(1 кофе = ${writeOff} ${writeOff <= 4 ? 'бонуса' : 'бонусов'})`}
            </p>
            {/* <p 
                // className={styles.bonuses_table_button_count}
                >
                {bonusCount}
            </p> 
            <button 
                className={styles.bonuses_table_button_right} 
                onClick={() => removeBonuses(id)}>
                    -
            </button> */}

            <div 
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginTop:'1.5rem'
                }}
            >

                <Button
                    variant='contained' 
                    color='warning'
                    onClick={() => removeBonuses(id)}
                    style={{
                        fontSize:'2rem', 
                        marginRight: '2rem',
                        backgroundColor: '#FFA700'
                    }}
                >
                    - 1
                </Button>
                <div style={{
                    display:'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }}>
                    <p 
                        style={{
                            fontFamily: 'Montserrat, sans-serif', 
                            fontSize:'2rem', 
                            marginRight: '2rem'
                        }}
                        >
                        {bonusCount}
                    </p> 
                    <p 
                        style={{fontFamily: 'Montserrat, sans-serif', fontSize:'1rem', marginRight: '1rem' }}
                        >
                        {`(Спишется ${bonusCount * -3} ${getNoun(bonusCount * -3, 'бонус', 'бонуса', 'бонусов' )})`}
                    </p> 
                </div>
                {/* <Button
                    variant='outlined' 
                    color='success'
                    onClick={() => addBonuses(id)}
                    style={{
                        fontSize:'2rem',
                        marginRight: '2rem'
                    }}
                >
                    + 1
                </Button> */}
            </div>

            </DialogContent>
            <DialogActions>
            <Button 
                onClick={handleCloseDialog}
                style={{fontFamily: 'Montserrat, sans-serif', fontSize:'1.4rem'}}
                >
                    Отменить
            </Button>
            <Button 
                onClick={() => sendBonuses(bonusCount, id)}
                style={{
                    fontFamily: 'Montserrat, sans-serif', 
                    color: '#41A85F', 
                    fontSize:'1.4rem', 
                    color:'#FFA700'
                }}
                >
                    списать
            </Button>
            </DialogActions>
        </Dialog>

    )
}

export default BonusesRemoveDialog