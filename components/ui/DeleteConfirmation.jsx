import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const DeleteConfirmation = ({openDialog, handleCloseDialog, title, description, onClick, cancel, confirm, href}) => {


    return (
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title"  style={{fontFamily: 'Montserrat', fontSize:'1.6rem'}}>
            {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description"  style={{fontFamily: 'Montserrat, sans-serif', fontSize:'1.5rem'}}>
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions >
                <Button onClick={handleCloseDialog}  style={{fontFamily: 'Montserrat, sans-serif', fontSize:'1.4rem'}}>{cancel}</Button>
                <Button onClick={onClick} href={href} style={{fontFamily: 'Montserrat, sans-serif', color: '#ED2222', fontSize:'1.4rem'}} autoFocus>
                    {confirm}
                </Button>
            </DialogActions>
        </Dialog>

    )
}

export default DeleteConfirmation