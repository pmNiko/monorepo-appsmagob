import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { Environments } from "@shared/infra";
import { useLocation } from "react-router-dom";
import { CustomIcon } from "../../../components";
import { ItemSection } from "./interfaces";

export const OptionsList = ({ options }: { options: ItemSection[] }) => {
  const location = useLocation();
  const handleGoTo = (externo: boolean, sector: string, ruta: string) => {
    if (externo) window.open(ruta, "_blank", "noreferrer");
    else window.location.href = `${Environments.Domain}/${sector}/${ruta}`;
  };

  const locationPath = Environments.Basename + location.pathname;

  return (
    <List>
      {options
        ?.sort((a, b) => a.posicion - b.posicion)
        .map((option) => {
          const current = "/" + option.sector + "/" + option.ruta;

          const match = locationPath.includes(current);

          return (
            <ListItemButton
              key={option.idmenu}
              sx={{
                backgroundColor: match ? "#2ea3f2" : "",
                color: match ? "white" : "",
                ":hover": {
                  color: match ? "black" : "",
                  borderRight: "3px solid black",
                },
              }}
              onClick={() =>
                handleGoTo(option.externo, option.sector, option.ruta)
              }
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={2}
              >
                <Box>
                  <CustomIcon
                    iconName={option.iconname}
                    iconFontSize={option.iconfontsize || 20}
                    iconColor={option.iconcolor || "black"}
                  />
                </Box>
                <ListItemText
                  primary={option.titulo}
                  sx={{
                    "& span, & svg": {
                      fontSize: "0.95em",
                    },
                  }}
                />
              </Box>
            </ListItemButton>
          );
        })}
    </List>
  );
};
