import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'


const BonusesAddDialog = ({openDialog, handleCloseDialog, bonusCount, addBonuses, removeBonuses, id, sendBonuses, }) => {
    return (
        <Dialog 
            open={openDialog} 
            onClose={handleCloseDialog}
        >
        <DialogTitle 
            style={{fontFamily: 'Montserrat', fontSize:'1.6rem'}}
        >
            Добавление бонусов
        </DialogTitle>
        <DialogContent>
            <DialogContentText 
                style={{fontFamily: 'Montserrat, sans-serif', fontSize:'1.5rem'}}
            >
                Введите количество купленных чашек кофе
            </DialogContentText>
            <p
                style={{fontFamily: 'Montserrat, sans-serif', fontSize:'1.1rem'}}
            >
                {`(1 купленный кофе = 1 бонус)`}
            </p>
            <div 
                style={{
                    display: 'flex',
                    justifyContent:'flex-start',
                    alignItems: 'center',
                    marginTop:'1.5rem'
                }}
            >
                {/* <Button
                    variant='outlined' 
                    color='warning'
                    onClick={() => removeBonuses(id)}
                    style={{
                        fontSize:'2rem', 
                        marginRight: '2rem',
                        // backgroundColor: '#FFA700'
                    }}
                >
                    - 1
                </Button> */}

                <Button
                    variant='contained' 
                    color='success'
                    onClick={() => addBonuses(id)}
                    style={{
                        fontSize:'2rem',
                        marginRight: '2rem'
                    }}
                >
                    + 1
                </Button>
                <p 
                    style={{fontFamily: 'Montserrat, sans-serif', fontSize:'2rem', marginRight: '1rem' }}
                    >
                    {bonusCount}
                </p> 
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
                style={{fontFamily: 'Montserrat, sans-serif', color: '#41A85F', fontSize:'1.4rem'}}
                >
                    Добавить
            </Button>
            </DialogActions>
        </Dialog>

    )
}

export default BonusesAddDialog