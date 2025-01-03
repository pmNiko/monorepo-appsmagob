import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import HelpIcon from '@mui/icons-material/Help'

/**
 * Component CustomPopUp
 * @description Sirve para colocar un texto de ayuda al usuario.
 */
export const CustomPopUp = ({ help }: { help: string }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'end',
            }}
        >
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState: any) => (
                    <div>
                        <Button variant="text" {...bindTrigger(popupState)} size="small">
                            <HelpIcon fontSize="medium" style={{ color: '#2ea3f2' }} />
                        </Button>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Typography sx={{ p: 2 }}>{help}</Typography>
                        </Popover>
                    </div>
                )}
            </PopupState>
        </div>
    )
}
