import { Box, Grid } from "@mui/material";
import { PrincipalItemCard } from "./PrincipalItemCard";
import { ItemSection } from "@shared/ui/layouts/components/Menu/interfaces";
import { CardItem } from "./CardItem";
import { useAuthStore } from "@shared/infra";

export const HeaderCards = ({ items }: { items: ItemSection[] }) => {
  const isLogged = useAuthStore((state) => state.isLogged);
  const user = useAuthStore((state) => state.user);

  return (
    <Box
      sx={{
        maxWidth: "800px", // Máximo 800px para pantallas grandes
        width: "100%", // Escala al 100% del ancho en pantallas pequeñas
        margin: "0 auto",
        padding: 2,
      }}
    >
      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6}>
          <PrincipalItemCard
            isLogged={isLogged}
            description={user?.denominacion}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            {items.map((item, index) => (
              <Grid item xs={6} key={index}>
                <CardItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
