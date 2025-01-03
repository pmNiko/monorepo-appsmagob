import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import parse from "html-react-parser"; // Parse para HTML
import { CustomIcon } from "@shared/ui";
import { ItemSection } from "@shared/ui/layouts/components/Menu/interfaces";

interface CardItemProps {
  item: ItemSection;
}

export const CardItem: React.FC<CardItemProps> = ({ item }) => {
  return (
    <Card
      sx={{
        height: 140,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: "5px 10px 20px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={item.goTo}
    >
      <CardContent>
        <CustomIcon
          iconName={item.iconname}
          iconFontSize={item.iconfontsize ?? 24}
          iconColor={item.iconcolor ?? "black"}
        />
        <Typography variant="subtitle2" fontWeight="bolder">
          {item.titulo}
        </Typography>
        <Box
          sx={{
            maxHeight: "70px", // Limita la altura del Box donde va el resumen
            overflow: "hidden", // Esconde cualquier contenido que se desborde
            display: "-webkit-box", // Necesario para aplicar WebkitLineClamp
            WebkitLineClamp: 2, // Limita el resumen a 2 líneas
            WebkitBoxOrient: "vertical", // Para apilar el texto verticalmente
          }}
        >
          <Typography
            variant="caption"
            color="text.primary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis", // Aplica el elipsis cuando el texto excede el contenedor
              display: "-webkit-box", // Necesario para aplicar WebkitLineClamp
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            gutterBottom
          >
            {parse(item.resumen)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
