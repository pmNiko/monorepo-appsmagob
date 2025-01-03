import { Box, Typography } from "@mui/material";

interface Props {
    label: string;
    value: string;
    width?: number;
}

export const RowDashboardCard = ({ label, value, width = 70 }: Props) => (
    <Typography variant="subtitle2" align="left" minHeight={10}>
        <Box component="span" sx={{ display: 'inline-block', width, fontWeight: 'bold' }}>
            {label}
        </Box>
        {value}
    </Typography>
)
