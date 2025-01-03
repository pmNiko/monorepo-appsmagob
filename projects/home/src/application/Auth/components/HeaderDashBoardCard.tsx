import { Typography } from "@mui/material"


interface Props {
    title: string,
    fontSize?: number | string
    align?: "left" | "right" | "center" | "inherit" | "justify"
}

export const HeaderDashBoardCard = ({ title, fontSize = '0.95em', align = 'left' }: Props) => {
    return (
        <Typography
            variant="subtitle2" align={align}
            fontWeight="bold" fontSize={fontSize}
        >
            {title}
        </Typography>
    )
}
