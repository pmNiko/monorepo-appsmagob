import { Stack, Typography } from "@mui/material"

interface Props {
    deudaEnLegales: boolean
    deudaUvi: boolean
    deudaMultas: boolean
}

export const NoticeSection = ({ deudaEnLegales, deudaUvi, deudaMultas }: Props) => {

    const hidden = !deudaEnLegales && !deudaUvi && !deudaMultas

    return (
        <Stack spacing={1} sx={{ borderTop: '1px solid #c1c1c1', display: hidden ? 'none' : '' }} >
            <Typography variant="caption" align="left" height={15} display='flex' alignItems='center' color='red'
                sx={{ display: deudaUvi ? '' : 'none' }}
            >
                * Registra deuda UVI pendiente de actualización
            </Typography>
            <Typography variant="caption" align="left" height={15} display='flex' alignItems='center' color='red'
                sx={{ display: deudaEnLegales ? '' : 'none' }}
            >
                * Registra deuda en legales excluida del monto a pagar
            </Typography>
            <Typography variant="caption" align="left" height={15} display='flex' alignItems='center' color='red'
                sx={{ display: deudaMultas ? '' : 'none' }}
            >
                * Registra multas vencidas Juzgado Municipal de Faltas
            </Typography>
        </Stack>
    )
}


