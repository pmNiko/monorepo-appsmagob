import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Button } from '@mui/material';

interface Props {
    showPassword: boolean
    toggleShowPasswords: () => void
}

/**
 * ---------- ToggleVisibilityPassword ------------
 * - Este se encarga de renderear el icono correspondiente
 * - Mediante el boton ejecuta la fn pasada como parametro 
 *   para alternar el estado de visibilidad
 */
export const ToggleVisibilityPassword = ({ showPassword, toggleShowPasswords }: Props) => {  
    return (
        <span style={{ marginLeft: -18, padding: 0 }}>       
          <Button variant="text" onClick={toggleShowPasswords}>
            { showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon /> }        
          </Button>    
        </span>
    )
}
