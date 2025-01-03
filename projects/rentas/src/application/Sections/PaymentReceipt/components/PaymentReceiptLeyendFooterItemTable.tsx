import { Grid, Typography } from '@mui/material'

export const PaymentReceiptLeyendFooterItemTable = () => {
    return (
        <Grid container>
            <Grid item sm={12} textAlign="center">
                <Typography mt={3} mb={6} mx={4} fontSize={14}>
                    <b>Nota:</b> Los pagos realizados fuera de la Municipalidad tienen una demora mínima de 24hs hábiles
                    en ser acreditados.
                </Typography>
            </Grid>
        </Grid>
    )
}
