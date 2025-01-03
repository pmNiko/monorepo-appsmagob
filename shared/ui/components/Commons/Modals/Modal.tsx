import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

interface Props {
    icon?: boolean
    success?: boolean
    message?: string
    children?: JSX.Element
    accept?: string
    actionAccept?: () => void
    close?: string
    closeAction: () => void
    toggleModal: boolean
    displayHidden?: boolean
}

export const Modal = ({
    icon = false,
    success = true,
    message,
    children,
    accept,
    close = 'Cerrar',
    closeAction,
    actionAccept,
    toggleModal,
    displayHidden = false,
}: Props) => {
    if (displayHidden) return null

    return (
        <Dialog open={toggleModal} onClose={closeAction} aria-labelledby="responsive-dialog-title">
            <DialogContent sx={{ display: 'flex', flexDirection: 'row', overflow: 'hidden', pl: 0.5 }}>
                {success && icon && <CheckCircleOutlineIcon color="success" fontSize="large" />}

                {!success && icon && <WarningAmberIcon color="error" fontSize="large" />}
                <DialogContentText ml={2} pt={1} sx={{ fontWeight: 'bold' }}>
                    {message} {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {!!accept && (
                    <Button variant="contained" color="success" size="medium" onClick={actionAccept}>
                        {accept}
                    </Button>
                )}
                <Button variant="contained" size="medium" onClick={closeAction} autoFocus>
                    {close}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
